const express = require('express')
const { adminRegister, adminLogin } = require('../Controllers/adminController')
const router = express.Router()

router.post('/adminRegister', adminRegister)
router.post('/adminLogin', adminLogin)

module.exports = router