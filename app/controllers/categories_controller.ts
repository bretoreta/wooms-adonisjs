import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { createPostValidator, updatePostValidator } from '#validators/categories/post_validator'

export default class CategoriesController {
  async index({ request, inertia }: HttpContext) {
    const categories = await Category.query().paginate(request.qs().page, request.qs().perPage)
    return inertia.render('categories/Index', { categories })
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const category = await Category.create(payload)

    return category
  }

  async show({ params, response }: HttpContext) {
    const category = await Category.find(params.id)

    if (!category) {
      return response.status(404).send({
        message: 'Category not found. Provided id ' + params.id + ' does not exist',
      })
    }

    return category
  }

  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)

    await Category.query().update(payload).where('id', params.id)
    const newCategory = await Category.find(params.id)

    return newCategory
  }

  async delete({ params, response }: HttpContext) {
    const category = await Category.find(params.id)
    await category?.delete()

    return response.status(204)
  }
}
