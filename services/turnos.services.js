import { db } from '../global/conexion_db.js'
import { ObjectId } from 'mongodb'

async function traerTurnos(filter={}) {
        
    return await db.collection('Turnos').find(filter).toArray()
    
}

async function crear(turno) {
    const turnoNuevo = {
        ...turno
    }

    await db.collection('Turnos').insertOne(turnoNuevo)
    
    return turnoNuevo
}

async function eliminar(id) {

    return await db.collection('Turnos').deleteOne({_id: new ObjectId(id)})
}

async function traerTurnosPorID(id) {
    return db.collection('Turnos').find({id_paciente: id}).toArray()
}

async function guardarTurno(turno) {
    const turnoNuevo = {
        ...turno
    }

    await db.collection('Turnos_Cancelados').insertOne(turnoNuevo)
    
    return turnoNuevo
}

async function traerTurnosCanceladosPorID(id) {
    return db.collection('Turnos_Cancelados').find({id_paciente: id}).toArray()
}

export {
    crear,
    traerTurnos,
    eliminar,
    traerTurnosPorID,
    guardarTurno,
    traerTurnosCanceladosPorID
}