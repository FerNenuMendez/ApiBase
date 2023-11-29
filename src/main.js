import express from 'express';
import { turnoRouter } from './routers/turnoRouter.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(turnoRouter)

app.listen(8080, () => { console.log("Conectado!") })