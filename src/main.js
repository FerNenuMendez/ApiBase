import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { apiRouter } from './routers/api/apiRestRouter.js';
import { webRouter } from "./routers/web/webRouter.js";
import { onConnection, tiempoReal } from "./sockets/socketController.js";
import { PORT } from './config.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())

const server = app.listen(PORT, () => {
    console.log(`Servidor conectado (puerto: ${PORT})`)
})

const websocketServer = new Server(server)
websocketServer.on('connection', onConnection(websocketServer))

app.use(tiempoReal(websocketServer))

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use(webRouter)

