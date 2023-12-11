import express, { Router } from 'express'
import { getController, getControllerId, postController, deleteController, getControllerUser, getControllerDate, getControllerSurname, getControllerName } from '../controllers/turnoController.js'

export const turnoRouter = Router()
turnoRouter.get('/api/turnos/', getController)
turnoRouter.get('/api/turnos/:id', getControllerId)
turnoRouter.get('/api/turnos/busqueda/:name', getControllerName)
turnoRouter.get('/api/turnos/busqueda/name/:surname', getControllerSurname)
turnoRouter.get('/api/turnos/busqueda/:usuario', getControllerUser)
turnoRouter.get('/api/turnos/busqueda/date/:fecha', getControllerDate)
turnoRouter.post('/api/turnos/', express.json(), postController)
turnoRouter.delete('/api/turnos/:id', express.json(), deleteController)