import { newDB } from "./turnoController.js";


// Función para obtener los datos del formulario y llamar a la función del controlador.
export async function turnoPostController(req, res) {
    const socket = io()
    socket.on('crearTurno', turno => {
        Swal.fire({
            text: 'Se quiere reservar el siguiente turno: ' + turno,
            toast: true,
            position: 'top-right',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            showDenyButton: true,
            denyButtonText: 'Rechazar'
        }).then((result) => {
            if (result.isConfirmed) {
                crearTurno()
            }
        })
    })
    const { nombre, usuario, fecha, hora, servicio, status, email } = req.body;
    try {
        const turnoData = {
            nombre: {
                pila: nombre.pila,
                apellido: nombre.apellido
            },
            email,
            usuario,
            servicio,
            fecha,
            hora,
            status
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