import jwt from 'jsonwebtoken';

function sesionIniciada(req, res, next) {
    const token = req.headers['auth-token']

    if(!token) {
        return res.status(401).json({mesage:'No enviaste el token'})
    }

    try {
        const payload = jwt.verify(token, 'CLAVE_SECRETA')

    } catch (error) {
        return res.status(401).json({message:'Token inválido'})
    }

    next()
}

function sesionIniciadaProfesionales(req, res, next) {
    const token = req.headers['auth-token']

    if(!token) {
        return res.status(401).json({mesage:'No enviaste el token'})
    }

    try {
        const payload = jwt.verify(token, 'CLAVE_SECRETA')

    } catch (error) {
        return res.status(401).json({message:'Token inválido'})
    }

    next()
}

export {
    sesionIniciada,
    sesionIniciadaProfesionales
}