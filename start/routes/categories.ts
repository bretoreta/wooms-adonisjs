import router from '@adonisjs/core/services/router'
const CategoriesController = () => import('#controllers/categories_controller')

router
  .group(() => {
    router.get('/', [CategoriesController, 'index']).as('categories.index')
    router.get('/create', [CategoriesController, 'create']).as('categories.create')
    router.get(':id', [CategoriesController, 'show']).as('categories.show')
    router.post('store', [CategoriesController, 'store']).as('categories.store')
    router.put(':id/update', [CategoriesController, 'update']).as('categories.update')
    router.delete(':id/delete', [CategoriesController, 'delete']).as('categories.delete')
  })
  .prefix('categories')
