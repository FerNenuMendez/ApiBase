const rtDiv = document.getElementById('rtDiv')

function mostrarTurnos() {
    const socket = io()
    socket.on('turnos', turno => {
        const turnosHTML = turno.map(turn => `
        <h3>Id: ${turn._id}</3>
        <h2>${turn.nombre}</h2>
        <p>${turn.usuario}</p>
        <h4>Descripción: ${turn.fecha}</h4>
        <h4>Precio: $${turn.hora}</h4>
        `)
        rtDiv.innerHTML = turnosHTML
    })
}