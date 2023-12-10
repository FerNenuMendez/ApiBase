import { MensajesManager } from '../mongodb/mongodb.js'
import { TurnoManager } from '../mongodb/mongodb.js'

export function onConnection(socketServer) {
    return async function (socket) {
        console.log('socket conectado')
        console.log('se conectó ' + socket.handshake.auth.usuario)
        socket.broadcast.emit(
            'nuevoUsuario',
            socket.handshake.auth.usuario)
        socket.emit(
            'turnos',
            await TurnoManager.find().lean()
        )
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
        res['mostrarTurnos'] = async () => {
            socketServer.emit(
                'turnos',
                await TurnoManager.find().lean()
            )
        }
        next()
    }
}