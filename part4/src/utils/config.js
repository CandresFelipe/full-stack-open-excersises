const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '../../.env')})

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

module.exports = {
    MONGO_URI,
    PORT
}