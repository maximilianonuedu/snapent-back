import { ObjectId } from 'mongodb'
import bcryptjs from 'bcryptjs'
import { db } from '../global/conexion_db.js'

async function compararClaves(coleccion, id, claves) {
    const profesional = await db.collection(coleccion).findOne({_id: new ObjectId(id)})

    if(!profesional) {
        throw new Error('Usuario no encontrado')
    }

    const profesionalExistente = await bcryptjs.compare(claves.claveActual, profesional.clave)

    if(!profesionalExistente) {
        throw new Error('Contraseña incorrecta')
    }

    return profesional
    
}

async function actualizarClave(coleccion, id, claves) {

    let claveNuevaHash = await bcryptjs.hash(claves.claveNuevaRep, 10)

    return db.collection(coleccion).updateOne({_id: new ObjectId(id)}, { $set: { clave: claveNuevaHash } })
}

export {
    compararClaves,
    actualizarClave
}