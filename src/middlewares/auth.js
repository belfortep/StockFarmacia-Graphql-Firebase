
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authenticate = (context) => {

    const authHeader = context.req.headers.authorization;
    if (authHeader) {

        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user
            } catch (err) {
                console.log(err)
            }
        }
        throw new Error('Authentication error')

    }
    throw new Error('Authentication error')

}

module.exports = authenticate