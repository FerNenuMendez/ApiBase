import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { turnoRouter } from './routers/turnoRouter.js';
import { webRouter } from "./routers/webRouter.js";
import { onConnection, tiempoReal } from "./sockets/socketController.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor conectado (puerto: ${PORT})`)
})

const websocketServer = new Server(server)
websocketServer.on('connection', onConnection(websocketServer))

app.use(tiempoReal(websocketServer))
app.use('/static', express.static('./static'))

app.use(turnoRouter)
app.use(webRouter)

