const express = require('express')
const { addProject, getProject } = require('../Controllers/projectControllers')
const upload = require('../Middleware/multer')
const router = express.Router()

router.post('/addProject', upload.single('image'), addProject)
router.get('/getProject', getProject)
module.exports = router