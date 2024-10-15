const app = require('./app')
const config = require('./src/utils/config')
const logger = require('./src/utils/logger')


app.listen(config.PORT,() => {
  logger.info('Backend URL', config.PUBLIC_URL)
  logger.info(`Server running on port ${config.PORT}`)
})