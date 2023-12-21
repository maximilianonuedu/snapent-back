import express from 'express';
import * as ConsultoriosController from '../../controllers/consultorios.controllers.js';

const route = express.Router();

route.route('/api/consultorios')
    .get(ConsultoriosController.buscarTodosConsultorios)

route.route('/api/consultorios/:idConsultorio')
    .get(ConsultoriosController.buscarConsultorioPorID)

export default route