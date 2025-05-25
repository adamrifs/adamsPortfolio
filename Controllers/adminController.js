const generateToken = require("../Config/utils")
const admin = require("../Models/adminSchema")
const bcrypt = require('bcryptjs')

const adminRegister = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ message: "all fields required" })
        }
        const existingAdmin = await admin.findOne({ email })
        if (existingAdmin) {
            return res.status(500).json({ message: 'admin already exist ' })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newAdmin = new admin({
            email,
            password: hashPassword
        })
        if (newAdmin) {
            generateToken(newAdmin._id, res)
            await newAdmin.save()
            res.status(200).json({ message: 'admin account created succesfull' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error occured on adminRegister" })
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ message: "all fields required" })
        }
        const Admin = await admin.findOne({ email })
        if (!Admin) {
            res.status(500).json({ message: "admin not found" })
        }
        const comparePassword = await bcrypt.compare(password, Admin.password)
        if (!comparePassword) {
            return res.status(500).json({ message: 'password not match' })
        }
        const token = generateToken(Admin._id, res)
        res.status(200).json({ message: "Login succesfull", email: Admin.email, token })
    } catch (error) {
        console.log(error, 'error occured on adminlogin')
        res.status(500).json({ message: "error occured on adminLogin" })
    }
}
module.exports = { adminRegister, adminLogin }