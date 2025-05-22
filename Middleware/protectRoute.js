const dotenv = require('dotenv')
const admin = require('../Models/adminSchema')
dotenv.config()

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(500).json({ message: "token required" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(500).json({ message: 'Unauthorized login' })
        }
        const Admin = await admin.findById(decoded.id).select('-password')
        if (!Admin) {
            return res.status(500).json({ message: 'admin not found' })
        }
        req.Admin = Admin
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error occured on protectRoute' })
    }
}

module.exports = protectRoute