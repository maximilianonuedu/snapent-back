import { db } from '../global/conexion_db.js'

async function traerObrasSociales(filter={}) {
    
    return await db.collection('Obras_Sociales').find(filter).toArray()
}

export {
    traerObrasSociales
}