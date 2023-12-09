import fs from 'fs/promises'

export class Turno {
    constructor({ id, nombre, usuario, fecha, hora }) {
        this.id = id,
            this.nombre = nombre,
            this.usuario = usuario,
            this.fecha = fecha,
            this.hora = hora
    }
    toPOJO() {
        return {
            id: this.id,
            nombre: this.nombre,
            usuario: this.usuario,
            fecha: this.fecha,
            hora: this.hora
        }
    }
}

export class TurnosDb {
    #turnos
    #path
    constructor() {
        this.#path = 'db/turnos.json';
        this.#turnos = []
    }

    toPOJO() {
        return {
            turnos: this.#turnos
        }
    }

    async getDb({ limit } = {}) {
        const db = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        if (!limit) {
            return db
        } else {
            const res = await this.turnosCount(limit)
            return res
        }
    }

    async saveTurnos(db) {
        await fs.writeFile(this.#path, JSON.stringify(db, null, 2))
    }

    async nuevoTurno(data) {
        const { nombre, usuario, fecha, hora } = data;
        const db = await this.getDb()
        const nextID = db.length + 1
        const turnoData = { id: nextID, nombre, usuario, fecha, hora }
        const turno = new Turno(turnoData)
        db.push(turno)
        await this.saveTurnos(db)
    }

    async getTurnoByID(id) {
        const db = await this.getDb()
        const turnoBuscado = db.find((e) => e.id === id)
        if (turnoBuscado) {
            return turnoBuscado
        } else {
            console.log(`Turno con ${id}, no encontrado`)
        }
    }

    async deleteTurno(id) {
        const db = await this.getDb()
        const index = db.findIndex((turno) => turno.id === id)
        const nuevaDb = [...db.slice(0, index), ...db.slice(index + 1)]
        await fs.writeFile(this.#path, JSON.stringify(nuevaDb, null, 2))
    }

    async turnosCount(count) {
        const turnos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const respProductos = turnos.slice(0, count)
        return respProductos
    }
}


