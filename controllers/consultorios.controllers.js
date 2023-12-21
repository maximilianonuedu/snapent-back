import * as consultoriosService from '../services/consultorios.services.js'

function buscarTodosConsultorios (req, res) {
    const filter = req.query

    consultoriosService.traerConsultorios(filter)
        .then(consultorios => res.json(consultorios))
}

function buscarConsultorioPorID(req, res) {
    const id = req.params.idConsultorio

    consultoriosService.traerConsultorioPorID(id)
        .then(function (consultorio) {
            if (consultorio) {
                res.status(200).json(consultorio)
            }
            else {
                res.status(500).json({ message: 'Este consultorio no existe.' })
            }
        })
}

export {
    buscarTodosConsultorios,
    buscarConsultorioPorID
}