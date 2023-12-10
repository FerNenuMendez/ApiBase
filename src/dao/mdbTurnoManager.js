import { Schema, model } from "mongoose";
import { randomUUID } from 'node:crypto'


const turnoSchema = new Schema({
    nombre: {
        pila: { type: String, required: true },
        apellido: { type: String, required: true }
    },
    usuario: { type: String, required: true, unique: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    status: { type: Boolean }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {

    },
    methods: {
        nuevoTurno: async function (data) {
            const producto = await model('turnos').create(data)
            return producto
        },

        turnosCount: async function (count) {
            const turnos = await model('turnos').find().lean()
            const respTurnos = turnos.slice(0, count)
            return respTurnos
        },

        getDb: async function ({ limit } = {}) {
            const db = await model('turnos').find().lean()
            if (!limit) {
                return db
            } else {
                const res = await this.turnosCount(limit)
                return res
            }
        },

        getTurnoById: async function (id) {
            const turno = await this.model('turnos').findById(id).lean();
            if (turno) {
                return turno;
            } else {
                console.log(`Turno con ${id}, no encontrado`);
            }
        },

        deleteTurno: async function (id) {
            const borrado = await model('turnos').deleteOne({ _id: id }).lean()
            return borrado
        }
    }
})

export const TurnoManager = model('turnos', turnoSchema)