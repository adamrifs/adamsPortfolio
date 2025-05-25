const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./Config/db')
const projectRoutes = require('./Routes/projectRoutes.js')
const adminRoutes = require('./Routes/adminRoutes.js')
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true
}))
app.use(express.json())

connectDB()


app.use('/api/projects', projectRoutes)
app.use('/api/admin', adminRoutes)

app.listen(port, () => {
    console.log(`server running succesfull on ${port}`)
})