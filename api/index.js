import { Express } from "express";

import multer from 'multer';

import * as usuariosService from './services/usuarios.services.js';
import * as profesionalesService from './services/profesionales.services.js';
import * as historiasClinicasService from './services/historias_clinicas.services.js';

import usuariosRoutes from './api/routes/usuarios.routes.js';
import profesionalesRoutes from './api/routes/profesionales.routes.js';
import especialidadesRoutes from './api/routes/especialidades.routes.js';
import turnosRoutes from './api/routes/turnos.routes.js';

import consultoriosRoutes from './api/routes/consultorios.routes.js';
import obrasSocialesRoutes from './api/routes/obras_sociales.routes.js';
import authRoutes from './api/routes/auth.routes.js';
import historiasClinicasRoutes from './api/routes/historias_clinicas.routes.js';

const app = express();


app.use(express.json());

app.use('/',express.static('public'))

app.use(usuariosRoutes)
app.use(profesionalesRoutes)
app.use(especialidadesRoutes)
app.use(turnosRoutes)
app.use(consultoriosRoutes)
app.use(obrasSocialesRoutes)
app.use(authRoutes)
app.use(historiasClinicasRoutes)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let tipo = req.params.tipo;
        let path = `./../front/snapent/public/${tipo}`;

        return cb(null, path)
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

// USUARIO
app.post('/upload/:tipo/usuario/:idUsuario', upload.single('file'), (req, res) => {
    const imageName = req.file.filename;
    const id = req.params.idUsuario;
    
    try {
        usuariosService.actualizarImagen(id, imageName)
            .then(function () {
                res.status(200).json({ message: 'Foto de perfil actualizada con éxito.' })
                
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
        
    } catch (error) {
        return res.sendStatus(500)
    }
})

// PROFESIONAL
app.post('/upload/:tipo/profesional/:idProfesional', upload.single('file'), (req, res) => {
    const imageName = req.file.filename;
    const id = req.params.idProfesional;
    
    try {
        profesionalesService.actualizarImagen(id, imageName)
            .then(function (rta) {
                console.log(rta)
                res.status(200).json({ message: 'Foto de perfil actualizada con éxito.' })
                
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err)
            })
        
    } catch (error) {
        return res.sendStatus(500)
    }
})

// HISTORIAL CLÍNICO
app.post('/upload/:tipo/:idProfesional/:idPaciente', upload.single('file'), (req, res) => {
    const imageName = req.file.filename;
    const id = req.params.idPaciente;
    const idProfesional = req.params.idProfesional;
    
    try {
        historiasClinicasService.actualizarArchivos(id, idProfesional, imageName)
            .then(function () {
                res.status(200).json({ message: 'Archivos actualizados con éxito.' })
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
        
    } catch (error) {
        return res.sendStatus(500)
    }
})

export default app