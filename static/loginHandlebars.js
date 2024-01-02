const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('http://localhost:8080/api/sesiones/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-ignore
        body: new URLSearchParams(new FormData(formLogin))
    })

    if (response.status === 201) {
        const sesion = await response.json()
        window.location.href = '/turnos/reservas'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})