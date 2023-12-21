import { db } from '../global/conexion_db.js'

async function traerEspecialidades(filter={}) {
    
    return await db.collection('Especialidades').find(filter).toArray()
}

export {
    traerEspecialidades
}