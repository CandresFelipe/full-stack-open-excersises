const personRouter = require('./src/controller/persons')
const cors = require('cors')
const middleware = require('./src/utils/middleware')
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./src/utils/error-handler')
const config = require('./src/utils/config')
const logger = require('./src/utils/logger')


const app = express()

//setup connection to the DB
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI).then(() => {
  logger.info('connected to MongoDB')
}).catch((err) => logger.error('Connection Error', err))

app.use(cors())
//app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons',personRouter)

app.use(middleware.unknownEndpoint)
app.use(errorHandler)


module.exports = app