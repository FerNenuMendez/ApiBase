import { MensajesManager } from '../mongodb/mongodb.js'
// import { TurnoManager } from '../mongodb/mongodb.js'
import { newDB } from '../controllers/turnoController.js'

export function onConnection(socketServer) {
    return async function (socket) {
        socket.broadcast.emit(
            'nuevoUsuario',
            socket.handshake.auth.usuario)
        socketServer.emit(
            'turnosTomados',
            await newDB.getDb()
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
        socket.on('crearTurno', (datosTurno) => {
            console.log('Turno creado con los siguientes datos:', datosTurno);
            socket.emit('turnoCreado', 'Se ha creado un nuevo turno');
        })
    }
}

export function tiempoReal(socketServer) {
    return function (req, res, next) {
        console.log('Socket Turnos Conectado')
        res['mostrarTurnos'] = async () => {
            socketServer.emit(
                'turnosTomados',
                await newDB.getDb()
            )
        }
        next()
    }
}


