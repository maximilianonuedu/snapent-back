import { ObjectId } from 'mongodb'
import { db } from '../global/conexion_db.js'

async function traerConsultorios(filter={}) {
    
    return await db.collection('Consultorios').find(filter).toArray()
}

async function traerConsultorioPorID(id) {
        
    return await db.collection('Consultorios').findOne({_id: new ObjectId(id)})
}

export {
    traerConsultorios,
    traerConsultorioPorID
}