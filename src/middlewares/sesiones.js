import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB, SS } from '../config'


const store = connectMongo.create({
    mongoUrl: MONGODB,
    ttl: 60 * 60 * 24 // 1d
})
export const sesiones = session({
    store,
    secret: SS,
    resave: false,
    saveUninitialized: false
})