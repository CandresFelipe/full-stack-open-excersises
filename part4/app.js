const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./src/utils/config')
const blogRouter = require('./src/controller/blogs')
const logger = require('./src/utils/middlewares')
const mongoose = require('mongoose')
const userRouter = require('./src/controller/user')
const testRouter = require('./src/controller/tests');
const loginRouter = require('./src/controller/login')
const helpers = require('./src/utils/list_helpers')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
}).then(() => 
logger.info('Connected to DB')).catch((error) => logger.error('error trying to connect to BD', error))

app.use(cors())
app.use(express.json())
app.use(helpers.tokenExtractor)

app.use('/api/blogs',helpers.userExtractor, blogRouter)
app.use('/api/user', userRouter)
app.use('/api/user', loginRouter)

if(process.env.NODE_ENV === 'test') {
    app.use('/api/test', testRouter)
}

app.use(logger.errorHandler)

module.exports = app
