const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' })
    res.cookie('jwt', token, {
        sameSite: 'none',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    return token
}

module.exports = generateToken