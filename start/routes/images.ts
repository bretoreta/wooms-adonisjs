const ImagesController = () => import('#controllers/images_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [ImagesController, 'index']).as('images.index')
    router.post('save', [ImagesController, 'save']).as('images.save')
    router.post(':id/feature', [ImagesController, 'feature']).as('images.feature')
    router.delete(':id/delete', [ImagesController, 'delete']).as('images.delete')
  })
  .prefix('images')
