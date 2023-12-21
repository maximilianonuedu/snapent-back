import express from 'express';
import * as TurnosController from '../../controllers/turnos.controllers.js';
import { sesionIniciada } from '../../middleware/auth.middleware.js';

const route = express.Router();

route.route('/api/turnos')
    .get(TurnosController.buscarTodosTurnos)
    .post(TurnosController.crearTurno)

route.route('/api/turnos/:idTurno')
    .get([sesionIniciada], TurnosController.traerTurnosPorID)
    .delete([sesionIniciada], TurnosController.eliminarTurno)

route.route('/api/turnos/cancelarTurno')
    .post([sesionIniciada],TurnosController.guardarTurnoCancelado)

route.route('/api/turnos/cancelarTurno/:idTurno')
    .get([sesionIniciada],TurnosController.traerTurnosCanceladosPorID)

export default route