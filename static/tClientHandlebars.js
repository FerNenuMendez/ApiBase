import { Swal } from 'sweetalert2'
const formulario = document.getElementById('reservaForm');
const btn = document.getElementById('btnSubmit')
// Función para obtener los datos del formulario y enviarlos al servidor

formulario?.addEventListener('submit', event => {
    event.preventDefault()
    const socket = io();
    const datosTurno = {
        nombre: formulario.nombre.value,
        apellido: formulario.apellido.value,
        usuario: formulario.usuario.value,
        mail: formulario.mail.value,
        servicio: formulario.servicio.value,
        fecha: formulario.fecha.value,
        hora: formulario.hora.value
    }

    console.log(datosTurno)
    socket.emit('crearTurno', datosTurno)

    formulario.reset()

})

// function crearTurno(event) {
//     event.preventDefault()
//

//
//

//     socket.emit('crearTurno', datosTurno)
//     socket.on('crearTurno', crearTurno => {
//         Swal.fire({
//             text: 'El turno fue solicitado, en breve le llegara la confirmacion',
//             toast: true,
//             position: 'top-right'
//         })
//     })


// }

// btn.onsubmit(crearTurno())