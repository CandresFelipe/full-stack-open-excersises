const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./src/utils/config')
const blogRouter = require('./src/controller/blogs')
const logger = require('./src/utils/middlewares')
const mongoose = require('mongoose')
const userRouter = require('./src/controller/user')
const loginRouter = require('./src/controller/login')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
}).then(() => 
logger.info('Connected to DB')).catch((error) => logger.error('error trying to connect to BD', error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/user', loginRouter)

app.use(logger.errorHandler)

module.exports = app
