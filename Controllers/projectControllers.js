const project = require("../Models/projectSchema")
const cloudinary = require('../Config/cloudinary.js')

const addProject = async (req, res) => {
    try {
        const { name, description, link } = req.body
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }
        const image = req.file?.path
        console.log(req.file)
        let uploadedImage = null

        const uploadResult = await cloudinary.uploader.upload(image, {
            // resource_type: 'image'
            folder: "projects"
        });
        uploadedImage = uploadResult.secure_url;

        const newProject = new project({
            name,
            description,
            link,
            image: uploadedImage
        })
        await newProject.save()
        res.status(200).json({ message: 'data added succesfull', project: newProject })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error occured on addProject' })
    }
}

const getProject = async (req, res) => {
    try {
        const listProject = await project.find()
        res.status(200).json({ message: 'projects fetched', listProject })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error occured on getProject' })
    }
}

module.exports = { addProject, getProject }