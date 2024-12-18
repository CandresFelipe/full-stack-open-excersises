
const errorHandler = (error, req, res, next) => {
  console.error('Error middleware log:',error.message)
  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError' ) {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler