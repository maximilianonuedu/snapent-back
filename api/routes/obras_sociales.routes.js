import express from 'express';
import * as ObrasSocialesController from '../../controllers/obras_sociales.controllers.js';

const route = express.Router();

route.route('/api/obrassociales')
    .get(ObrasSocialesController.buscarTodasObrasSociales)

export default route