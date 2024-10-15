const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./src/utils/config')
const blogRouter = require('./src/controller/blogs')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI, {
    serverSelectionTimeoutMS: 100000,
}).then(() => 
console.log('Connected to DB')).catch((error) => console.log('error trying to connect to BD', error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
