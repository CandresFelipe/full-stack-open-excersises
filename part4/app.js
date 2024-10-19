const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./src/utils/config')
const blogRouter = require('./src/controller/blogs')
const logger = require('./src/utils/middlewares')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
}).then(() => 
logger.info('Connected to DB')).catch((error) => logger.error('error trying to connect to BD', error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
