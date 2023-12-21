import * as usuariosService from '../services/usuarios.services.js'
import * as tokenService from '../services/token.services.js'
import jwt from 'jsonwebtoken'

function buscarTodosUsuarios(req,res) {
    const filter = req.query

    usuariosService.traerUsuarios(filter)
        .then(usuarios => res.status(200).json(usuarios))
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function buscarUsuarioPorID(req, res) {
    const id = req.params.idUsuario

    usuariosService.traerUsuarioPorID(id)
        .then(function (usuario) {
            if (usuario) {
                res.status(200).json(usuario)
            }
            else {
                res.status(500).json({ message: 'Este usuario no existe.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function editarUsuario(req, res) {
    const id = req.params.idUsuario
    const usuario = {}

    if (req.body.nombre) {
        usuario.nombre = req.body.nombre
    }

    if (req.body.apellido) {
        usuario.apellido = req.body.apellido
    }

    if (req.body.email) {
        usuario.email = req.body.email
    }

    if (req.body.telefono) {
        usuario.telefono = req.body.telefono
    }

    if (req.body.fecha_de_nacimiento) {
        usuario.fecha_de_nacimiento = req.body.fecha_de_nacimiento.substr(3, 2)+"/"+req.body.fecha_de_nacimiento.substr(0, 2)+"/"+req.body.fecha_de_nacimiento.substr(6, 4);
    }

    if (req.body.DNI) {
        usuario.DNI = req.body.DNI
    }

    if (req.body.obra_social) {
        usuario.obra_social = req.body.obra_social
    }

    if (req.body.peso) {
        usuario.peso = req.body.peso
    }

    if (req.body.altura) {
        usuario.altura = req.body.altura
    }

    usuariosService.editar(id, usuario)
        .then(function (rta) {
            if(rta === false) {
                return res.sendStatus(400)

            } else {
                res.status(200).json({ message: 'El usuario ha sido editado con éxito.' })
            }
            
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function login(req, res) {
    const usuario = {
        email: req.body.email,
        clave: req.body.clave
    }

    usuariosService.iniciarSesion(usuario)
        .then(usuario => {
            if(usuario === false) {
                const token = null;
                const usuario = null; 

                res.status(400).json({token, usuario})

            } else {

                const token = jwt.sign({id:usuario._id}, 'CLAVE_SECRETA')
    
                tokenService.crearToken({token, usuario_id: usuario._id})
                
                res.json({token, usuario})

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

function crearUsuario(req, res) {
    let fecha = req.body.fecha_de_nacimiento.substr(3, 2)+"/"+req.body.fecha_de_nacimiento.substr(0, 2)+"/"+req.body.fecha_de_nacimiento.substr(6, 4);

    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        clave: req.body.clave,
        telefono: req.body.telefono,
        fecha_de_nacimiento: fecha,
        DNI: req.body.DNI,
        obra_social: req.body.obra_social,
        peso: req.body.peso,
        altura: req.body.altura, 
        avatar: req.body.avatar,
        color_avatar: req.body.color_avatar
    }

    usuariosService.registrar(usuario)
        .then(function (rta) {
            if(rta === false) {
                return res.sendStatus(400)

            } else {
                res.status(200).json({ message: '¡Felicitaciones! El registro se ha realizado con éxito.' })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function eliminarUsuario(req, res) {
    const id = req.params.idUsuario

    usuariosService.traerUsuarioPorID(id)
        .then(function (usuario) {
            const fechaHoy = new Date();
            const hoyArg = fechaHoy.toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"});

            usuario.fecha_eliminado = hoyArg;

            usuariosService.guardarUsuarioEliminado(usuario)
                .then(function () {
                    usuariosService.eliminar(usuario._id)
                        .then(function () {
                            res.status(200).json({ message: 'El usuario ha sido eliminado con éxito.' })
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

function editarPesoAltura(req, res) {
    const id = req.params.idUsuario
    const usuario = {}

    if (req.body.peso) {
        usuario.peso = req.body.peso
    }

    if (req.body.altura) {
        usuario.altura = req.body.altura
    }

    usuariosService.editarPesoAltura(id, usuario)
        .then(function (rta) {
  
            res.status(200).json({ message: 'El usuario ha sido editado con éxito.' })
            
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

export{
    buscarTodosUsuarios,
    crearUsuario,
    buscarUsuarioPorID,
    editarUsuario,
    login,
    logout,
    eliminarUsuario,
    editarPesoAltura
}