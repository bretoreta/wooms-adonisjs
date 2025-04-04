import Image from '#models/image'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import env from '#start/env'

export default class ImagesController {
  index({ request }: HttpContext) {
    return Image.query().preload('product').paginate(request.qs().page, request.qs().perPage)
  }

  async save({ request, response }: HttpContext) {
    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpeg', 'jpg', 'png', 'webp'],
    })

    if (!image) {
      return response.badRequest({ error: 'Missing required parameter - image - from the request' })
    }

    const key = `product-images/temp/${cuid()}.${image.extname}`
    const s3Bucket = env.get('S3_BUCKET')
    await image.moveToDisk(key)

    const imageRecord = await Image.create({
      path: `${s3Bucket}/${key}`,
      url: image.meta.url,
    })

    return imageRecord
  }

  async feature({ params, response }: HttpContext) {
    await Image.query().update('featured', true).where('id', params.id)
    const newImage = await Image.find(params.id)

    if (!newImage) {
      return response.status(404).send({
        message: 'We couldn`t find the specified image. Please try a different one',
      })
    }
    await Image.query()
      .update('featured', false)
      .where('product_id', newImage.product_id)
      .whereNot('id', newImage.id)

    return newImage
  }

  async delete({ params, response }: HttpContext) {
    const image = await Image.find(params.id)

    if (!image) {
      return response.status(404).send({
        message: 'We couldn`t find the specified image. Please try a different one',
      })
    }

    const disk = drive.use()

    await disk.delete(image.path)
    await image.delete()

    return response.status(204)
  }
}
