const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authenticate = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]//el token viene en una cabecera, como empieza con Bearer MITOKEN, separo bearer del token
    console.log(token)
    const verified = jwt.verify(token, process.env.SECRET_KEY) //en verified se encuentra el objeto usuario con id, username y email
    console.log(verified)
    req.verifiedUser = verified.user//en el request ahora guardo el usuario
    next()

}

module.exports = authenticate