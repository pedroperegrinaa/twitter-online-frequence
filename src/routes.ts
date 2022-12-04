import { Router } from 'express'
import FormController from './controllers/FormController'

const routes = Router()

routes.get('/forms', FormController.index)
routes.post('/forms', FormController.store)
routes.get('/forms/:id', FormController.show)
routes.put('/forms/:id', FormController.update)
routes.delete('/forms/:id', FormController.destroy)

export default routes
