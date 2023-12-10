import { TurnoManager } from '../mongodb/mongodb.js'


export const newDB = new TurnoManager

export async function getController(req, res) {
    const { limit } = req.query
    res.json(await newDB.getDb({ limit }))
}

export async function getControllerId(req, res) {
    const id = (req.params.id)
    const buscado = await newDB.getTurnoById(id)
    if (!buscado._eventsCount === 0) {
        res.status(404).json({
            message: `Carrito con id ${id} not found`
        })
    } else {
        res.json(buscado)
    }
}

export async function postController(req, res) {
    const { nombre, usuario, fecha, hora } = req.body;

    try {
        const turnoData = {
            nombre: {
                pila: nombre.pila,
                apellido: nombre.apellido
            },
            usuario,
            fecha,
            hora,
            status: true
        };

        const turno = await newDB.nuevoTurno(turnoData);
        res['mostrarTurnos']()
        res.json(turno);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'No se ha podido agregar el turno'
        });
    }
}


export async function deleteController(req, res) {
    const id = (req.params.id)
    try {
        const borrado = await newDB.deleteTurno(id)
        res.json(borrado)
    } catch (error) {
        res.status(404).json({
            message: `persona con id ${id} no se encontro`
        })
    }
}