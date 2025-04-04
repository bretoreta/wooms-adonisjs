const BundlesController = () => import('#controllers/bundles_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [BundlesController, 'index']).as('bundles.index')
    router.get('/search', [BundlesController, 'search']).as('bundles.search')
    router.get(':sku', [BundlesController, 'show']).as('bundles.show')
    router.post('store', [BundlesController, 'store']).as('bundles.store')
    router.put(':sku/update', [BundlesController, 'update']).as('bundles.update')
    router.post(':sku/image-upload', [BundlesController, 'uploadImage']).as('bundles.uploadImage')
    router.delete(':sku/delete', [BundlesController, 'delete']).as('bundles.delete')
  })
  .prefix('bundles')
