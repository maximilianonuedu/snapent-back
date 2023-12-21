import { db } from '../global/conexion_db.js'

async function crearToken(token) {

    await db.collection('Tokens').insertOne(token)
}

async function eliminarToken(token) {

    await db.collection('Tokens').deleteOne(token)
}

async function eliminarTokenPorUsuarioId(usuario_id) {

    await db.collection('Tokens').deleteMany({usuario_id})
}

async function traerToken(token) {

    return await db.collection('Tokens').findOne({token})
}

export{
    crearToken,
    eliminarToken,
    eliminarTokenPorUsuarioId,
    traerToken
}