const app = require('./app')
const config = require('./src/utils/config')

app.listen(config.PORT, () => {
    console.log(`server is running in port ${config.PORT}`)
})