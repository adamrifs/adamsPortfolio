const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./Config/db')
const projectRoutes = require('./Routes/projectRoutes.js')
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

connectDB()


app.use('/api/projects', projectRoutes)

app.listen(port, () => {
    console.log(`server running succesfull on ${port}`)
})