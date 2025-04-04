import _ from 'lodash'

import Bundle from '#models/bundle'
import { createPostValidator, updatePostValidator } from '#validators/bundles/post_validator'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import Product from '#models/product'
import BundleItem from '#models/bundle_item'

interface NewBundleItem {
  sku: string
  price: number
  quantity: number
}

export default class BundlesController {
  async index({ request, inertia }: HttpContext) {
    const bundledProducts = await Bundle.query()
      .preload('categories')
      .preload('images')
      .paginate(request.qs().page, request.qs().perPage)
    return inertia.render('bundles/index', { bundledProducts })
  }

  async search({ request }: HttpContext) {
    const productBundle = await Bundle.query()
      .whereILike('sku', '%' + request.qs().query + '%')
      .preload('categories')
      .preload('images')
      .paginate(request.qs().page, request.qs().perPage)

    return productBundle.serialize()
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const createData = _.omit(payload, ['categories', 'bundle_items'])

    // Generate SKU, max bundles and price
    const sku = await this.generateSKU()
    const maxBundles = await this.calculateMaxBundles(payload.bundle_items)
    const bundlePrice = this.calculateBundlePrice(payload.bundle_items)

    const productBundle = await Bundle.create({
      ...createData,
      sku: sku,
      stock_quantity: maxBundles,
      price: bundlePrice,
    })

    if (payload.categories) {
      await productBundle.related('categories').sync(payload.categories)
    }

    if (payload.bundle_items) {
      await productBundle.related('items').createMany(payload.bundle_items)
    }

    await productBundle.load('categories')

    return productBundle.serialize()
  }

  async show({ params, response }: HttpContext) {
    const productBundle = await Bundle.findBy('sku', params.sku)

    if (!productBundle) {
      return response.status(404).send({
        message: 'Product not found. Provided sku ' + params.sku + ' does not exist',
      })
    }

    await productBundle.load('categories')
    await productBundle.load('images')

    return productBundle.serialize()
  }

  async update({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)
    const updateData = _.omit(payload, ['categories', 'bundle_items'])

    await Bundle.query().update(updateData).where('sku', params.sku)
    const newproductBundle = await Bundle.findBy('sku', params.sku)

    if (!newproductBundle) {
      return response.status(404).send({
        message: 'Product not found. Provided sku ' + params.sku + ' does not exist',
      })
    }

    if (payload.bundle_items) {
      await BundleItem.updateOrCreateMany(['bundle_sku', 'sku'], payload.bundle_items)
    }

    if (payload.categories) {
      await newproductBundle.related('categories').sync(payload.categories)
    }

    await newproductBundle.load('categories')
    await newproductBundle.load('items')

    return newproductBundle.serialize()
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

    const productBundle = await Bundle.findBy('sku', params.sku)

    if (!productBundle) {
      return response.status(404).send({
        message: 'Product not found. Provided sku ' + params.sku + ' does not exist',
      })
    }

    const key = `product-images/${productBundle.sku}/${cuid()}.${image.extname}`
    const s3Bucket = env.get('S3_BUCKET')
    await image.moveToDisk(key)

    const imageRecord = await productBundle.related('images').create({
      product_sku: productBundle.sku,
      path: `${s3Bucket}/${key}`,
      url: image.meta.url,
    })

    return imageRecord.serialize()
  }

  async delete({ params, response }: HttpContext) {
    const productBundle = await Bundle.findBy('sku', params.sku)
    await productBundle?.delete()

    return response.status(204)
  }

  async generateSKU() {
    let currentSKU: number = 300000

    const lastBundle = await Bundle.query().orderBy('created_at', 'desc').first()

    if (lastBundle) {
      currentSKU = Number.parseInt(lastBundle.sku) + 1
    }

    return currentSKU.toString()
  }

  async calculateMaxBundles(bundle_items: Array<NewBundleItem>) {
    let maxBundles = Infinity

    for (const item of bundle_items) {
      const product = await Product.query().select('stock_quantity').where('sku', item.sku).first()

      if (product) {
        const stockQuantity = product.stock_quantity

        if (stockQuantity <= 0) {
          maxBundles = 0
          break
        }

        const possibleBundles = Math.floor(stockQuantity / item.quantity)

        if (_.isNull(possibleBundles)) {
          maxBundles = 0
          break
        }

        maxBundles = Math.min(maxBundles, possibleBundles)
      } else {
        // if product not found, assume 0 bundles possible
        maxBundles = 0
        break
      }
    }

    return Number.isFinite(maxBundles) ? maxBundles : 0
  }

  calculateBundlePrice(bundle_items: Array<NewBundleItem>) {
    return bundle_items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }
}
