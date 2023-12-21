import express from 'express';
import * as HistoriasClinicasController from '../../controllers/historias_clinicas.controllers.js';
import { sesionIniciadaProfesionales, sesionIniciada } from '../../middleware/auth.middleware.js';

const route = express.Router();

route.route('/api/historiasClinicas/:idProfesional')
    .get([sesionIniciadaProfesionales], HistoriasClinicasController.traerHistoriasPorProfesional)

route.route('/api/historiasClinicas/paciente/:idPaciente/:idProfesional')
    .get(HistoriasClinicasController.traerHistoriasPorPaciente)

route.route('/api/historiasClinicas')
    .post(HistoriasClinicasController.crearHistoriaClinica)

route.route('/api/historiasClinicas/paciente/:idPaciente')
    .get([sesionIniciada], HistoriasClinicasController.traerHistoriasPorID)

export default route