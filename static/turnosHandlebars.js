const ul = document.getElementById('ulTurnos')

function mostrarTurnos() {
    const socket = io()
    socket.on('turnosTimeReal', turnos => {
        ul.innerHTML = ''
        for (const { _id, usuario, fecha, hora } of turnos) {
            const li = document.createElement('li')
            li.innerHTML = `(ID: ${_id}, Usuario: ${usuario}): ${fecha}, ${hora}`
            ul?.appendChild(li)
        }
    })
}