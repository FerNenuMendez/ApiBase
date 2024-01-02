import { Schema, model } from 'mongoose'

const collection = 'mensajes'

const mensajeSchema = new Schema({
    timestamp: { type: Date },
    usuario: { type: String },
    texto: { type: String }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
    },
})

export const MensajesManager = model(collection, mensajeSchema)