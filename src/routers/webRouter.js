import { Router, json } from 'express'
import { MensajesManager } from '../mongodb/mongodb.js'
import { TurnoManager } from '../mongodb/mongodb.js'

export const webRouter = Router()
webRouter.use(json())

webRouter.get('/chat', (req, res) => {
    res.render('chat.handlebars', { titulo: 'Chat' })
})
webRouter.post('/chat', async (req, res) => {
    try {
        const mensaje = req.body
        await MensajesManager.create(mensaje)
        res['notificarNuevoMensaje']()
        res.status(201).json()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

webRouter.get('/turnos/reservas', (req, res) => {
    res.render('turnos.handlebars', { titulo: 'Turnos' })
    res['mostrarTurnos']()
})

webRouter.post('/turnos/reservas', async (req, res) => {
    try {
        const turno = req.body
        await TurnoManager.nuevoTurno(turno)
        res['mostrarTurnos']()
        res.status(201).json()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

