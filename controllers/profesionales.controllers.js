import * as profesionalesService from '../services/profesionales.services.js'
import jwt from 'jsonwebtoken'
import * as tokenService from '../services/token.services.js'

import * as consultoriosServices from './../services/consultorios.services.js';

function buscarTodosProfesionales (req, res) {
    const filter = req.query

    profesionalesService.traerProfesionales(filter)
        .then(profesionales => res.json(profesionales))
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function buscarProfesionalPorID(req, res) {
    const id = req.params.idProfesional

    profesionalesService.traerProfesionalPorID(id)
        .then(function (profesional) {
            if (profesional) {
                res.status(200).json(profesional)
            }
            else {
                res.status(500).json({ message: 'Este profesional no existe.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function editarProfesional(req, res) {
    consultoriosServices.traerConsultorioPorID(req.body.consultorio)
        .then(function (consultorio) {
            if (consultorio) {
                
                const id = req.params.idProfesional
                const profesional = {}
            
                if (req.body.nombre) {
                    profesional.nombre = req.body.nombre
                }
            
                if (req.body.apellido) {
                    profesional.apellido = req.body.apellido
                }
            
                if (req.body.matricula) {
                    profesional.matricula = req.body.matricula
                }
            
                if (req.body.email) {
                    profesional.email = req.body.email
                }
            
                if (req.body.especialidad) {
                    profesional.especialidad = req.body.especialidad
                }
            
                if (req.body.subespecialidad) {
                    profesional.subespecialidad = req.body.subespecialidad
                }

                if (req.body.consultorio) {
                    profesional.id_consultorio = req.body.consultorio
                }

                if(consultorio.nombre) {
                    profesional.nombre_consultorio = consultorio.nombre
                }
            
                profesionalesService.editar(id, profesional)
                    .then(function (rta) {
                        if(rta === false) {
                            return res.sendStatus(400)
            
                        } else {
                            res.status(200).json({ message: 'El profesional ha sido editado con éxito.' })
                        }
                    })
                    .catch(function (err) {
                        res.status(500).json(err)
                    })
            }
        })
}

function login(req, res) {
    const profesional = {
        email: req.body.email,
        clave: req.body.clave
    }

    profesionalesService.iniciarSesion(profesional)
        .then(profesional => {

            if(profesional === false) {
                const token = null;
                const profesional = null; 

                res.status(400).json({token, profesional})

            } else {

                const token = jwt.sign({id:profesional._id}, 'CLAVE_SECRETA')
    
                tokenService.crearToken({token, profesional_id: profesional._id})
                
                res.json({token, profesional})

            }

        })
        .catch(err => {
            res.status(500).json({ message: 'Error al iniciar la sesión. Usuario no encontrado.' })
        })
}

function logout(req, res) {
    const token = req.headers['auth-token']

    tokenService.eliminarToken({token})
        .then(() => {
            res.json({message: 'Logout exitoso'})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
}

function crearProfesional(req, res) {
    consultoriosServices.traerConsultorioPorID(req.body.consultorio)
        .then(function (consultorio) {
            if (consultorio) {
                const profesional = {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    clave: req.body.clave,
                    matricula: req.body.matricula,
                    especialidad: req.body.especialidad,
                    subespecialidad: req.body.subespecialidad,
                    id_consultorio: req.body.consultorio,
                    nombre_consultorio: consultorio.nombre,
                    avatar: req.body.avatar,
                    color_avatar: req.body.color_avatar
                }
            
                profesionalesService.registrar(profesional)
                    .then(function (rta) {
                        if(rta === false) {
                            return res.sendStatus(400)
            
                        } else {
                            res.status(200).json({ message: '¡Felicitaciones! El registro se ha realizado con éxito.' })
                        }
                    })
                    .catch(function () {
                        res.status(500).json({ message: 'Error al realizar el registro. Ingrese sus datos nuevamente.' })
                    })
            }
        })
}

function eliminarProfesional(req, res) {
    const id = req.params.idProfesional

    profesionalesService.traerProfesionalPorID(id)
        .then(function (usuario) {
            const fechaHoy = new Date();
            const hoyArg = fechaHoy.toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"});

            usuario.fecha_eliminado = hoyArg;

            profesionalesService.guardarProfesionalEliminado(usuario)
                .then(function () {
                    profesionalesService.eliminar(id)
                        .then(function () {
                            res.status(200).json({ message: 'El profesional ha sido eliminado con éxito.' })
                        })
                        .catch(function (err) {
                            res.status(500).json(err)
                        })
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function eliminarObraSocial(req, res) {
    const idProfesional = req.params.idProfesional
    const nombre = req.headers['nombre']

    profesionalesService.eliminarObraSocial(idProfesional, nombre)
        .then(function () {
            res.status(200).json({ message: 'La obra social ha sido eliminada con éxito.' })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function agregarObraSocial(req, res) {
    const idProfesional = req.params.idProfesional
    const nombre = req.headers['nombre']
    
    profesionalesService.traerProfesionalPorID(idProfesional)
        .then(function (profesional) {
            if (profesional) {
                let arrayObrasSociales = []
                arrayObrasSociales = profesional.obras_sociales

                let arrayOS = arrayObrasSociales.includes(nombre)

                if(arrayOS != true) {

                    profesionalesService.agregarObraSocial(idProfesional, nombre)
                        .then(function () {
                            res.status(200).json({ message: 'Obra social añadida con éxito.' })
                        })
                        .catch(function (err) {
                            res.status(500).json(err)
                        })

                } else {
                    return res.sendStatus(400)
                }
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function buscarDisponibilidadHorariaPorID(req, res) {
    const id = req.params.idProfesional

    profesionalesService.traerProfesionalPorID(id)
        .then(function (profesional) {
            if (profesional) {
                res.status(200).json(profesional.disponibilidad_horaria)
            }
            else {
                res.status(500).json({ message: 'Este profesional no existe.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function editarDisponibilidadHoraria(req, res) {
    const id = req.params.idProfesional
    const horarios = {}

    if (req.body.dia) {
        horarios.dia = req.body.dia
    }

    if (req.body.horaInicio) {
        horarios.horaInicio = req.body.horaInicio
    }

    if (req.body.horaFin) {
        horarios.horaFin = req.body.horaFin
    }

    if (req.body.deshabilitado) {
        horarios.deshabilitado = req.body.deshabilitado
    }

    profesionalesService.editarDisponibilidadHoraria(id, horarios)
        .then(function (rta) {
            res.status(200).json({ message: 'La disponibilidad ha sido editada con éxito.' })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

export{
    buscarTodosProfesionales,
    crearProfesional,
    buscarProfesionalPorID,
    editarProfesional,
    login,
    logout,
    eliminarProfesional,
    eliminarObraSocial,
    agregarObraSocial,
    buscarDisponibilidadHorariaPorID,
    editarDisponibilidadHoraria
}