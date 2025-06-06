/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import './routes/categories.js'
import './routes/products.js'
import './routes/images.js'
import './routes/bundles.js'
router.on('/').renderInertia('home')
