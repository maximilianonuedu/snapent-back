import * as turnosService from '../services/turnos.services.js'

async function buscarTodosTurnos (req, res) {
    const filter = req.query

    turnosService.traerTurnos(filter)
        .then(turnos => res.json(turnos))
}

async function crearTurno(req, res) {

    const turno = {
        fecha: req.body.fechaDatoEnviar,
        hora: req.body.HoraRecibidaLectura,
        id_profesional: req.body.idProfesional,
        id_paciente: req.body.idPaciente
    }

    turnosService.crear(turno)
        .then(function () {
            res.status(200).json({ message: '¡Felicitaciones! Tu turno se ha registrado con éxito.' })
        })
        .catch(function () {
            res.status(500).json({ message: 'Error al registrar el turno. Ingrese los datos nuevamente.' })
        })
}

function eliminarTurno(req, res) {
    const id= req.params.idTurno

    turnosService.eliminar(id)
        .then(function () {
            res.status(200).json({ message: 'El turno ha sido eliminado con éxito.' })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function traerTurnosPorID(req, res) {
    const id = req.params.idTurno

    turnosService.traerTurnosPorID(id)
        .then(function (turnos) {
            if (turnos) {
                res.status(200).json(turnos)
            }
            else {
                res.status(500).json({ message: 'No existen turnos para este usuario.' })
            }
        })
}

async function guardarTurnoCancelado(req, res) {
    const fechaHoy = new Date();
    const hoyArg = fechaHoy.toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"});

    console.log(req.body)

    let turno = {};

    if(req.body.canceladoPor === 'paciente') {
       turno = {
            fecha: req.body.fecha,
            hora: req.body.hora,
            id_profesional: req.body.profesional._id,
            id_paciente: req.body.idPaciente,
            fecha_cancelacion: hoyArg,
            motivo: req.body.motivo
        }
    }

    if(req.body.canceladoPor === 'profesional') {
        turno = {
            fecha: req.body.date,
            hora: req.body.hora,
            id_profesional: req.body.idProfesional,
            id_paciente: req.body.idPaciente,
            fecha_cancelacion: hoyArg,
            motivo: req.body.motivo
        }
    }

    turnosService.guardarTurno(turno)
        .then(function () {
            res.status(200).json({ message: '¡Felicitaciones! Tu turno se ha registrado con éxito.' })
        })
        .catch(function () {
            res.status(500).json({ message: 'Error al registrar el turno. Ingrese los datos nuevamente.' })
        })
}

function traerTurnosCanceladosPorID(req, res) {
    const id = req.params.idTurno

    turnosService.traerTurnosCanceladosPorID(id)
        .then(function (turnos) {
            if (turnos) {
                res.status(200).json(turnos)
            }
            else {
                res.status(500).json({ message: 'No existen turnos cancelados para este usuario.' })
            }
        })
}

export {
    crearTurno,
    buscarTodosTurnos,
    eliminarTurno,
    traerTurnosPorID,
    guardarTurnoCancelado,
    traerTurnosCanceladosPorID
}