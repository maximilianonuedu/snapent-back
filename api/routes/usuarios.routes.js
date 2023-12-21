import express from 'express';
import * as UsuariosController from '../../controllers/usuarios.controllers.js';
import { sesionIniciada } from '../../middleware/auth.middleware.js';

const route = express.Router();

route.route('/api/usuarios')
    .get(UsuariosController.buscarTodosUsuarios)
    .post(UsuariosController.crearUsuario)
    
route.route('/api/usuarios/login')
    .post(UsuariosController.login)

route.route('/api/usuarios/logout')
    .post([sesionIniciada], UsuariosController.logout)

route.route('/api/usuarios/:idUsuario')
    .get( UsuariosController.buscarUsuarioPorID)
    .patch([sesionIniciada], UsuariosController.editarUsuario)
    .delete([sesionIniciada], UsuariosController.eliminarUsuario)

route.route('/api/usuarios/historiaClinica/:idUsuario')
    .patch([sesionIniciada], UsuariosController.editarPesoAltura)

export default route