const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const admin = mongoose.model('admin', adminSchema)
module.exports = admin