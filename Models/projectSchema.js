const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    }
})
const project = mongoose.model('project', projectSchema)
module.exports = project