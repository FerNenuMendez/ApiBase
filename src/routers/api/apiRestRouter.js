import { Router } from 'express'
import { turnoRouter } from './turnoRouter.js'
import { usuariosRouter } from './usuarioRouter.js'
import { sesionesRouter } from './sesionesRouter.js'

export const apiRouter = Router()

apiRouter.use('/turnos', turnoRouter)
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/sesiones', sesionesRouter)