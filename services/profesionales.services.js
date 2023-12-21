import { ObjectId } from 'mongodb'
import bcryptjs from 'bcryptjs'
import { db } from '../global/conexion_db.js'

async function traerProfesionales(filter={}) {
    const nuevoFilter = {};

    if(filter.nombre != 'null') {
        nuevoFilter.nombre = filter.nombre;
    }

    if(filter.especialidad != 'null') {
        nuevoFilter.especialidad = filter.especialidad;
    }

    if(filter.obras_sociales != 'null') {
        nuevoFilter.obras_sociales = filter.obras_sociales;
    }
        
    return await db.collection('Profesionales').find(nuevoFilter).toArray()
    
}

async function registrar(profesional) {
    const profesionalNuevo = {
        ...profesional
    }

    const profesionalExistente = await db.collection('Profesionales').findOne({ email: profesionalNuevo.email })

    if(profesionalExistente) {
        return false
    }

    profesionalNuevo.clave = await bcryptjs.hash(profesionalNuevo.clave, 10)

    await db.collection('Profesionales').insertOne(profesionalNuevo)

    return profesionalNuevo
}

async function traerProfesionalPorID(id) {
        
    return await db.collection('Profesionales').findOne({_id: new ObjectId(id)})
}

async function editar(id, profesional) {

    const profesionalExistente = await db.collection('Profesionales').findOne({ email: profesional.email })

    if(profesionalExistente && profesionalExistente._id != id) {
        return false
    }

    return db.collection('Profesionales').updateOne({_id: new ObjectId(id)}, {$set: profesional})
}

async function iniciarSesion({email, clave}) {

    const profesional = await db.collection('Profesionales').findOne({email})

    if(!profesional) {
        throw new Error('Usuario no encontrado')
    }

    const profesionalExistente = await bcryptjs.compare(clave, profesional.clave)

    if(!profesionalExistente) {
        return false
    }

    return profesional
}

async function eliminar(id) {
        
    return await db.collection('Profesionales').deleteOne({_id: new ObjectId(id)})
}

async function eliminarObraSocial(idProfesional, nombre) {
  
    return db.collection('Profesionales').updateOne({_id: new ObjectId(idProfesional)},{$pull:{ obras_sociales: nombre }})
}

async function agregarObraSocial(idProfesional, nombre) {
  
    return db.collection('Profesionales').updateOne({_id: new ObjectId(idProfesional)},{$push:{ obras_sociales: nombre }})
}

async function actualizarImagen(id, nombre) {
    return db.collection('Profesionales').updateOne({_id: new ObjectId(id)},{$set:{ avatar: nombre }})
}

async function guardarProfesionalEliminado(profesional) {
    const profesionalEliminado = {
        ...profesional
    }

    await db.collection('Usuarios_Eliminados').insertOne(profesionalEliminado)

    return profesionalEliminado
}

async function editarDisponibilidadHoraria(id, horarios) {

    return db.collection('Profesionales').updateOne({_id: new ObjectId(id)}, { $set: { "disponibilidad_horaria.$[elem].horaInicio" : horarios.horaInicio, "disponibilidad_horaria.$[elem].horaFin" : horarios.horaFin, "disponibilidad_horaria.$[elem].deshabilitado" : horarios.deshabilitado } },
    { arrayFilters: [ { "elem.dia": horarios.dia } ] })  
}

export{
    traerProfesionales,
    registrar,
    traerProfesionalPorID,
    editar,
    iniciarSesion,
    eliminar,
    eliminarObraSocial,
    agregarObraSocial,
    actualizarImagen,
    guardarProfesionalEliminado,
    editarDisponibilidadHoraria
}