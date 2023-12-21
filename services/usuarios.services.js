import { ObjectId } from 'mongodb'
import bcryptjs from 'bcryptjs'
import { db } from '../global/conexion_db.js'

async function traerUsuarios(filter={}) {

    return await db.collection('Usuarios').find(filter).toArray()
}

async function registrar(usuario) {
    const usuarioNuevo = {
        ...usuario
    }

    const usuarioExistente = await db.collection('Usuarios').findOne({ email: usuarioNuevo.email })

    if(usuarioExistente) {
        return false
    }

    usuarioNuevo.clave = await bcryptjs.hash(usuarioNuevo.clave, 10)

    await db.collection('Usuarios').insertOne(usuarioNuevo)
    return usuarioNuevo
}

async function traerUsuarioPorID(id) {

    return await db.collection('Usuarios').findOne({_id: new ObjectId(id)})
}

async function editar(id, usuario) {

    const usuarioExistente = await db.collection('Usuarios').findOne({ email: usuario.email })

    if(usuarioExistente && usuarioExistente._id != id) {
        return false
    }
    
    return db.collection('Usuarios').updateOne({_id: new ObjectId(id)}, {$set: usuario})
}

async function iniciarSesion({email, clave}) {

    const usuario = await db.collection('Usuarios').findOne({email})

    if(!usuario) {
        throw new Error('Usuario no encontrado')
    }

    const usuarioExistente = await bcryptjs.compare(clave, usuario.clave)

    if(!usuarioExistente) {
        return false
    }

    return usuario
}

async function eliminar(id) {

    return await db.collection('Usuarios').deleteOne({_id: new ObjectId(id)})
}

async function actualizarImagen(id, nombre) {
    return db.collection('Usuarios').updateOne({_id: new ObjectId(id)},{$set:{ avatar: nombre }})
}

async function guardarUsuarioEliminado(usuario) {
    const usuarioEliminado = {
        ...usuario
    }

    await db.collection('Usuarios_Eliminados').insertOne(usuarioEliminado)

    return usuarioEliminado
}

async function editarPesoAltura(id, usuario) {
    
    return db.collection('Usuarios').updateOne({_id: new ObjectId(id)}, {$set: {peso: usuario.peso, altura: usuario.altura}})
}

export {
    traerUsuarios,
    registrar,
    traerUsuarioPorID,
    editar,
    iniciarSesion,
    eliminar,
    actualizarImagen,
    guardarUsuarioEliminado,
    editarPesoAltura
}