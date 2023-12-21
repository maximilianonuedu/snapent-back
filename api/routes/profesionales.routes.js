import express from 'express';
import * as ProfesionalesController from '../../controllers/profesionales.controllers.js';
import { sesionIniciadaProfesionales } from '../../middleware/auth.middleware.js';

const route = express.Router();

route.route('/api/profesionales')
    .get(ProfesionalesController.buscarTodosProfesionales)
    .post(ProfesionalesController.crearProfesional)
    
route.route('/api/profesionales/login')
    .post(ProfesionalesController.login)

route.route('/api/profesionales/logout')
    .post([sesionIniciadaProfesionales], ProfesionalesController.logout)

route.route('/api/profesionales/:idProfesional')
    .get(ProfesionalesController.buscarProfesionalPorID)
    .patch([sesionIniciadaProfesionales], ProfesionalesController.editarProfesional)
    .delete([sesionIniciadaProfesionales], ProfesionalesController.eliminarProfesional)

route.route('/api/profesionales/obrasocial/:idProfesional')
    .post([sesionIniciadaProfesionales], ProfesionalesController.agregarObraSocial)
    .delete([sesionIniciadaProfesionales], ProfesionalesController.eliminarObraSocial)

route.route('/api/profesionales/disponibilidad/:idProfesional')
    .get(ProfesionalesController.buscarDisponibilidadHorariaPorID)
    .patch([sesionIniciadaProfesionales], ProfesionalesController.editarDisponibilidadHoraria)

export default route