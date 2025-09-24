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
const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'id is required' });

    const name = req.body?.name;
    const description = req.body?.description;
    const link = req.body?.link;

    let updateData = { name, description, link };

    if (req.file) {
      const imagePath = req.file.path;

      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imagePath, {
        folder: "projects"
      });
      updateData.image = uploadResult.secure_url;

      // Optional: delete old image
      const oldProject = await project.findById(id);
      if (oldProject && oldProject.image) {
        const publicId = oldProject.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`projects/${publicId}`);
      }
    }

    const editedProject = await project.findByIdAndUpdate(id, updateData, { new: true });
    if (!editedProject) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project edited successfully', editedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error occurred on editProject' });
  }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(500).json({ message: 'id is required' })
        }
        await project.findByIdAndDelete(id)
        res.status(200).json({ message: 'deleted succesfull' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error occured on deleteProject' })
    }
}
module.exports = { addProject, getProject, deleteProject, editProject }