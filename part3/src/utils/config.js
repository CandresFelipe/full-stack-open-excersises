
const path = require('path')
const dotenv = require('dotenv')
const resolvedPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: path.resolve(resolvedPath) })

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const PUBLIC_URL = process.env.RENDER_EXTERNAL_URL

module.exports = {
  MONGO_URI,
  PORT,
  PUBLIC_URL
}