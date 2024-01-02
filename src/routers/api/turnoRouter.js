import express, { Router } from 'express'
import { getController, getControllerId, deleteController, getControllerUser, getControllerDate, getControllerSurname, getControllerName } from '../../controllers/turnoController.js'
import { turnoPostController } from '../../controllers/turnoPostControllers.js'

export const turnoRouter = Router()
turnoRouter.get('/', getController)
turnoRouter.get('/:id', getControllerId)
turnoRouter.get('/busqueda/nombre/:name', getControllerName)
turnoRouter.get('/busqueda/apellido/:surname', getControllerSurname)
turnoRouter.get('/busqueda/usuario/:usuario', getControllerUser)
turnoRouter.get('/busqueda/fecha/:fecha', getControllerDate)
turnoRouter.post('/', express.json(), turnoPostController)
turnoRouter.delete('/:id', express.json(), deleteController)