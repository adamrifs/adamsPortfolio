const express = require('express')
const { addProject, getProject, deleteProject } = require('../Controllers/projectControllers')
const upload = require('../Middleware/multer')
const router = express.Router()

router.post('/addProject', upload.single('image'), addProject)
router.get('/getProject', getProject)
router.delete('/deleteProject/:id',deleteProject)

module.exports = router