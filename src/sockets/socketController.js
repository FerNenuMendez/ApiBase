import { MensajesManager } from '../mongodb/mongodb.js'
import { TurnoManager } from '../mongodb/mongodb.js'
import { newDB } from '../controllers/turnoController.js'

export function onConnection(socketServer) {
    return async function (socket) {
        console.log('socket CHAT conectado')
        console.log('se conectó ' + socket.handshake.auth.usuario)
        socket.broadcast.emit(
            'nuevoUsuario',
            socket.handshake.auth.usuario)
        socket.emit(
            'mensajes',
            await MensajesManager.find().lean()
        )
        socket.on('msjs', async mensaje => {
            await MensajesManager.create(mensaje)
            socketServer.emit(
                'mensajes',
                await MensajesManager.find().lean()
            )
        })
        socket.on('disconnecting', () => {
            socket.broadcast.emit(
                'usuarioDesconectado',
                socket.handshake.auth.usuario)
        })
    }
}

export function tiempoReal(socketServer) {
    return function (req, res, next) {
        console.log('socket TURNOS conectado')
        res['mostrarTurnos'] = async () => {
            const turnosDB = await newDB.getDb()
            socketServer.emit(
                'turnosTimeReal',
                turnosDB
            )
        }
        next()
    }
}