import * as historiasClinicasService from '../services/historias_clinicas.services.js'
import jwt from 'jsonwebtoken'
import * as tokenService from '../services/token.services.js'

function traerHistoriasPorProfesional(req, res) {
    const id = req.params.idProfesional

    historiasClinicasService.traerHistoriasProfesional(id)
        .then(function (historias) {
            if (historias) {
                res.status(200).json(historias)
            }
            else {
                res.status(500).json({ message: 'No existen historias clínicas con este id.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function traerHistoriasPorPaciente(req, res) {
    const id = req.params.idPaciente
    const idProfesional = req.params.idProfesional

    historiasClinicasService.traerHistoriasPaciente(id, idProfesional)
        .then(function (historias) {
            if (historias) {
                res.status(200).json(historias)
            }
            else {
                res.status(500).json({ message: 'No existen historias clínicas con este id.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function crearHistoriaClinica(req, res) {
    console.log(req.body)

    const historiaClinica = {
        id_profesional: req.body.idProfesional,
        id_paciente: req.body.idPaciente,
        especialidad: req.body.especialidad,
        archivos: req.body.archivos
    }

    historiasClinicasService.crear(historiaClinica)
        .then(function (rta) {
            res.status(200).json({ message: 'Historia clínica creada con éxito.' })
        })
        .catch(function () {
            res.status(500).json({ message: 'Error al crear la historia clínica.' })
        })
}

function traerHistoriasPorID(req, res) {
    const id = req.params.idPaciente

    historiasClinicasService.traerHistoriasID(id)
        .then(function (historias) {
            if (historias) {
                res.status(200).json(historias)
            }
            else {
                res.status(500).json({ message: 'No existen historias clínicas con este id.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

export {
    traerHistoriasPorProfesional,
    traerHistoriasPorPaciente,
    crearHistoriaClinica,
    traerHistoriasPorID
}