import express, { Router } from 'express'
import { getController, getControllerId, postController, deleteController } from '../controllers/turnoController.js'

export const turnoRouter = Router()
turnoRouter.get('/api/turnos/', getController)
turnoRouter.get('/api/turnos/:id', getControllerId)
turnoRouter.post('/api/turnos/', express.json(), postController)
turnoRouter.delete('/api/turnos/:id', express.json(), deleteController)