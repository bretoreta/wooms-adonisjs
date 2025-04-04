const ProductsController = () => import('#controllers/products_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [ProductsController, 'index']).as('products.index')
    router.get('/search', [ProductsController, 'search']).as('products.search')
    router.get(':sku', [ProductsController, 'show']).as('products.show')
    router.post('store', [ProductsController, 'store']).as('products.store')
    router.put(':sku/update', [ProductsController, 'update']).as('products.update')
    router.post(':sku/image-upload', [ProductsController, 'uploadImage']).as('products.uploadImage')
    router.delete(':sku/delete', [ProductsController, 'delete']).as('products.delete')
  })
  .prefix('products')
