import * as authService from '../services/auth.services.js'

function actualizarClave(req, res) {
    let id;
    let coleccion;

    if(req.params.idActualizar) {
        id = req.params.idActualizar
    }

    if(req.body.coleccion) {
        coleccion = req.body.coleccion;
    }

    const claves = {}

    if (req.body.claveActual) {
        claves.claveActual = req.body.claveActual
    }

    if (req.body.claveNueva) {
        claves.claveNueva = req.body.claveNueva
    }

    if (req.body.claveNuevaRep) {
        claves.claveNuevaRep = req.body.claveNuevaRep
    }

    authService.compararClaves(coleccion, id, claves)
        .then(function () {
            if(req.body.claveActual != req.body.claveNuevaRep) {
                authService.actualizarClave(coleccion, id, claves)
                .then(function () {
                    res.status(200).json({ message: 'Clave actualizada con éxito.' })
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })

            } else {
                return res.sendStatus(400)
            }
            
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

export {
    actualizarClave
}