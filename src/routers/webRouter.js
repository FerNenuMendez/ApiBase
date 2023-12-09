import { Router, json } from 'express'
import { MensajesManager } from '../mongodb/mongodb.js'

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