import { Schema, model } from "mongoose";

const collection = 'turnos'

const turnoSchema = new Schema({
    nombre: {
        pila: { type: String, required: true, unique: false },
        apellido: { type: String, required: true, unique: false }
    },
    usuario: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: false },
    servicio: { type: String, required: true, unique: false },
    fecha: { type: String, required: true, unique: false },
    hora: { type: String, required: true, unique: false },
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

        getTurnoByUsuario: async function (usuario) {
            const user = await this.model('turnos').find({ usuario: usuario }).lean();
            if (user) {
                return user;
            } else {
                console.log(`User con ${usuario}, no encontrado`);
            }
        },

        getTurnoByNombre: async function (nombre) {
            try {
                const user = await this.model('turnos').find({ 'nombre.pila': nombre }).lean();
                if (user.length > 0) {
                    return user;
                } else {
                    console.log(`Usuario con nombre ${nombre} no encontrado`);
                    return null;
                }
            } catch (error) {
                console.error('Error al buscar el usuario:', error);
                throw error;
            }
        },

        getTurnoBySurname: async function (nombre) {
            try {
                const user = await this.model('turnos').find({ 'nombre.apellido': nombre }).lean();
                if (user.length > 0) {
                    return user;
                } else {
                    console.log(`Usuario con apellido ${nombre} no encontrado`);
                    return null;
                }
            } catch (error) {
                console.error('Error al buscar el usuario:', error);
                throw error;
            }
        },


        getTurnoByDate: async function (fecha) {
            const user = await this.model('turnos').find({ fecha: fecha }).lean();
            if (user) {
                return user;
            } else {
                console.log(`Busqueda con ${fecha}, no encontrada`);
            }
        },

        deleteTurno: async function (id) {
            const borrado = await model('turnos').deleteOne({ _id: id }).lean()
            return borrado
        },
    }
})

export const TurnoManager = model(collection, turnoSchema)