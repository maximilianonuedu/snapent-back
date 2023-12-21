import * as obrasSocialesService from '../services/obras_sociales.services.js'

function buscarTodasObrasSociales (req, res) {
    const filter = req.query

    obrasSocialesService.traerObrasSociales(filter)
        .then(obras_sociales => res.json(obras_sociales))
}

export {
    buscarTodasObrasSociales
}