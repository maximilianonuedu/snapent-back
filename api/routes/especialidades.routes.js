import express from 'express';
import * as EspecialidadesController from '../../controllers/especialidades.controllers.js';

const route = express.Router();

route.route('/api/especialidades')
    .get(EspecialidadesController.buscarTodasEspecialidades)

export default route