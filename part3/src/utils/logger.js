const info = (...params) => {
  console.log(`[INFO]: ${JSON.stringify(params)}`)
}

const error = (...params) => {
  console.error(`[ERROR]: ${params}`)
}

module.exports = {
  info,
  error
}