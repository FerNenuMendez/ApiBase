import { TurnosDb } from '../dao/models/turnoManager.js'

const newDB = new TurnosDb()

export async function getController(req, res) {
    const { limit } = req.query
    res.json(await newDB.getDb({ limit }))
}

export async function getControllerId(req, res) {
    const id = Number(req.params.id)
    const buscado = await newDB.getTurnoByID(id)
    if (!buscado) {
        res.status(404).json({
            message: `turno con id ${id} no encontrado`
        })
    } else {
        res.json(buscado)
    }
}

export async function postController(req, res) {
    const { nombre, usuario, fecha, hora } = req.body
    const data = { nombre, usuario, fecha, hora }
    try {
        const turno = await newDB.nuevoTurno(data)
        res.json(turno)
    } catch (error) {
        res.status(400).json({
            message: `No se ha podido agregar el turno`
        })
    }
}

export async function deleteController(req, res) {
    const id = Number(req.params.id)
    try {
        const borrado = await newDB.deleteTurno(id)
        res.json(borrado)
    } catch (error) {
        res.status(404).json({
            message: `persona con id ${id} no se encontro`
        })
    }
}