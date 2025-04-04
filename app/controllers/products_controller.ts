import _ from 'lodash'

import Product from '#models/product'
import { createPostValidator, updatePostValidator } from '#validators/products/post_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import env from '#start/env'

export default class ProductsController {
  async index({ request }: HttpContext) {
    const products = await Product.query()
      .preload('categories')
      .preload('images')
      .paginate(request.qs().page, request.qs().perPage)
    return products.serialize()
  }

  async search({ request }: HttpContext) {
    const product = await Product.query()
      .whereILike('sku', '%' + request.qs().query + '%')
      .preload('categories')
      .preload('images')
      .paginate(request.qs().page, request.qs().perPage)

    return product.serialize()
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const product = await Product.create(payload)

    return product.serialize()
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.findBy('sku', params.sku)

    if (!product) {
      return response.status(404).send({
        message: 'Product not found. Provided sku ' + params.sku + ' does not exist',
      })
    }

    await product.load('categories')
    await product.load('images')

    return product.serialize()
  }

  async update({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)
    const updateData = _.omit(payload, ['categories'])

    await Product.query().update(updateData).where('sku', params.sku)
    const newProduct = await Product.findBy('sku', params.sku)

    if (!newProduct) {
      return response.status(404).send({
        message: 'Product not found. Provided sku ' + params.sku + ' does not exist',
      })
    }

    if (payload.categories) {
      await newProduct.related('categories').sync(payload.categories)
    }

    await newProduct.load('categories')

    return newProduct.serialize()
  }

  async uploadImage({ request, response, params }: HttpContext) {
    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpeg', 'jpg', 'png', 'webp'],
    })

    if (!image) {
      return response.badRequest({ error: 'Missing required parameter (image) from the request' })
    }

    if (!image.isValid) {
      response.badRequest({ error: image.errors })
    }

    const product = await Product.findBy('sku', params.sku)

    if (!product) {
      return response.status(404).send({
        message: 'Product not found. Provided sku ' + params.sku + ' does not exist',
      })
    }

    const key = `product-images/${product.sku}/${cuid()}.${image.extname}`
    const s3Bucket = env.get('S3_BUCKET')
    await image.moveToDisk(key)

    const imageRecord = await product.related('images').create({
      product_id: product.id,
      path: `${s3Bucket}/${key}`,
      url: image.meta.url,
    })

    return imageRecord.serialize()
  }

  async delete({ params, response }: HttpContext) {
    const product = await Product.findBy('sku', params.sku)
    await product?.delete()

    return response.status(204)
  }
}
