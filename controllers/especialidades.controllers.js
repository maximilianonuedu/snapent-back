import * as especialidadesService from '../services/especialidades.services.js'

function buscarTodasEspecialidades (req, res) {
    const filter = req.query

    especialidadesService.traerEspecialidades(filter)
        .then(especialidades => res.json(especialidades))
}

export {
    buscarTodasEspecialidades
}