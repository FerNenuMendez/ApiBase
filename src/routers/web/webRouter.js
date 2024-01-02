import { Router, json } from 'express'
import { MensajesManager } from '../../mongodb/mongodb.js'
import { TurnoManager } from '../../mongodb/mongodb.js'
import { onlyLogueadosWeb } from '../../middlewares/credenciales.js'

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

webRouter.get('/turnos/reservas', onlyLogueadosWeb, (req, res) => {
    res.render('turnos.handlebars', {
        titulo: 'Turnos',
        ...req.session['user']
    })
    res['mostrarTurnos']()
})

webRouter.get('/turnos/reservas/agendar', async (req, res) => {
    res.render('turnoClient.handlebars', { titulo: 'Agendar Turnos' })
})

webRouter.get('/api/usuarios/login', (req, res) => {
    res.render('login.handlebars', { pageTitle: 'Login' })
})

webRouter.get('/api/usuarios/register', (req, res) => {
    res.render('register.handlebars', { pageTitle: 'Registrarse' })
})
