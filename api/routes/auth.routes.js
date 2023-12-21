import express from 'express';
import * as AuthController from '../../controllers/auth.controllers.js';
import { sesionIniciada } from '../../middleware/auth.middleware.js';

const route = express.Router();

route.route('/api/auth/clave/:idActualizar')
    .patch([sesionIniciada], AuthController.actualizarClave)

export default route