const info = (...args) => {
    if(process.env.NODE_ENV !== 'test') {
        console.log(`[INFO]: ${args}`)
    }
}

const error = (...args) => {
    if(process.env.NODE_ENV !== 'test') {
        console.error(`[ERROR]: ${args}`)
    }
}

module.exports = {
    info,
    error
}