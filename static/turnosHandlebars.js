const divC = document.getElementById('div_Container')

function mostrarTurnos() {
    const socket = io()
    socket.on('turnosTomados', turnos => {
        const turnosHTML = turnos.map(turno => `
        <h3>${turno.nombre.pila} ${turno.nombre.apellido}</h3>
        <h4> ${turno.fecha}, ${turno.hora} </h4>
        `)
        divC.innerHTML = turnosHTML
    })
}
mostrarTurnos()