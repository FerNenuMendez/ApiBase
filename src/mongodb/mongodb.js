import mongoose from "mongoose";
import { MONGODB } from '../config.js'

await mongoose.connect(MONGODB)

export { MensajesManager } from '../dao/mdbChatManager.js'
export { TurnoManager } from '../dao/mdbTurnoManager.js'
export { UsuarioManager } from '../dao/mdbUserManager.js'