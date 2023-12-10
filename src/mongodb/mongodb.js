import mongoose from "mongoose";

await mongoose.connect('mongodb://127.0.0.1:27017/turnero')

export { MensajesManager } from '../dao/mdbChatManager.js'
export { TurnoManager } from '../dao/mdbTurnoManager.js'