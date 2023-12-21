import { ObjectId } from 'mongodb'
import bcryptjs from 'bcryptjs'
import { db } from '../global/conexion_db.js'

async function traerHistoriasProfesional(id) {
        
    return await db.collection('Historias_Clinicas').find({id_profesional: id}).toArray()
}

async function traerHistoriasPaciente(id, idProfesional) {
        
    return await db.collection('Historias_Clinicas').findOne({id_paciente: id, id_profesional: idProfesional})
}

async function actualizarArchivos(id, idProfesional, nombre) {
    const historiaClinica = await db.collection('Historias_Clinicas').findOne({id_paciente: id, id_profesional: idProfesional})
  
    return db.collection('Historias_Clinicas').updateOne({_id: new ObjectId(historiaClinica._id)},{$push:{ archivos: nombre }})
}

async function crear(historia) {
    const historiaNueva = {
        ...historia
    }

    const historiaClinicaExistente = await db.collection('Historias_Clinicas').findOne({id_paciente: historia.id_paciente, id_profesional: historia.id_profesional})

    if(historiaClinicaExistente) {
        await db.collection('Historias_Clinicas').deleteOne({_id: new ObjectId(historiaClinicaExistente._id)})
    }
        
    await db.collection('Historias_Clinicas').insertOne(historiaNueva)

    return historiaNueva
}

async function traerHistoriasID(id) {
        
    return await db.collection('Historias_Clinicas').find({id_paciente: id}).toArray()
}

export {
    traerHistoriasProfesional,
    traerHistoriasPaciente,
    actualizarArchivos,
    crear,
    traerHistoriasID
}