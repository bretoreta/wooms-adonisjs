import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { createPostValidator, updatePostValidator } from '#validators/categories/post_validator'

export default class CategoriesController {
  async index({ request, inertia }: HttpContext) {
    const categories = await Category.query().paginate(request.qs().page, request.qs().perPage)
    return inertia.render('categories/Index', { categories })
  }

  create({ inertia }: HttpContext) {
    return inertia.render('categories/Create')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    await Category.create(payload)

    return response.redirect().toRoute('categories.index')
  }

  async show({ params, inertia }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    return inertia.render('categories/Edit', { category })
  }

  async update({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)

    await Category.query().update(payload).where('id', params.id)

    return response.redirect().toRoute('categories.index')
  }

  async delete({ params, response }: HttpContext) {
    const category = await Category.find(params.id)
    await category?.delete()

    return response.redirect().toRoute('categories.index')
  }
}
