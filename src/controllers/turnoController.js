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
            message: `Carrito con ID ${id} no encontrado`
        })
    } else {
        res.json(buscado)
    }
}

export async function getControllerUser(req, res) {
    try {
        const user = req.params.usuario;
        const buscado = await newDB.getTurnoByUsuario(user);
        if (!buscado) {
            res.status(404).json({
                message: `Usuario con nombre de usuario ${user} no encontrado`
            });
        } else {
            res.json(buscado);
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener el usuario'
        });
    }
}

export async function getControllerName(req, res) {
    try {
        const user = req.params.name;
        const buscado = await newDB.getTurnoByNombre(user);
        if (!buscado) {
            res.status(404).json({
                message: `Usuario con nombre ${user} no encontrado`
            });
        } else {
            res.json(buscado);
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener el usuario'
        });
    }
}

export async function getControllerSurname(req, res) {
    try {
        const user = req.params.surname;
        const buscado = await newDB.getTurnoBySurname(user);
        if (!buscado) {
            res.status(404).json({
                message: `Usuario con apellido ${user} no encontrado`
            });
        } else {
            res.json(buscado);
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener el usuario'
        });
    }
}

export async function getControllerDate(req, res) {
    try {
        const fecha = req.params.fecha;
        const buscado = await newDB.getTurnoByDate(fecha);
        if (!buscado) {
            res.status(404).json({
                message: `Turno con fecha ${fecha} no encontrado`
            });
        } else {
            res.json(buscado);
        }
    } catch (error) {
        console.error('Error al obtener el turno:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener la fecha'
        });
    }
}

// export async function getControllerMail(req, res) {
//     try {
//         const email = req.params.email;
//         const buscado = await newDB.getTurnoByMail(email);
//         if (!buscado) {
//             res.status(404).json({
//                 message: `Turno con email ${email} no encontrado`
//             });
//         } else {
//             res.json(buscado);
//         }
//     } catch (error) {
//         console.error('Error al obtener el turno:', error);
//         res.status(500).json({
//             message: 'Error interno del servidor al obtener el email'
//         });
//     }
// }

// export async function postController(req, res) {
//     const { nombre, usuario, fecha, hora, servicio, status, email } = req.body;
//     try {
//         const turnoData = {
//             nombre: {
//                 pila: nombre.pila,
//                 apellido: nombre.apellido
//             },
//             email,
//             usuario,
//             servicio,
//             fecha,
//             hora,
//             status
//         };
//         const turno = await newDB.nuevoTurno(turnoData);
//         res['mostrarTurnos']()
//         res.json(turno);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({
//             message: 'No se ha podido agregar el turno'
//         });
//     }
// }

export async function deleteController(req, res) {
    const id = (req.params.id)
    try {
        const borrado = await newDB.deleteTurno(id)
        res['mostrarTurnos']()
        res.json(borrado)
    } catch (error) {
        res.status(404).json({
            message: `Persona con ID ${id} no encontrado`
        })
    }
}