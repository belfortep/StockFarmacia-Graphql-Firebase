const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const createJWTToken = (user) => {

    return jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    })

}

module.exports = {
    createJWTToken
}