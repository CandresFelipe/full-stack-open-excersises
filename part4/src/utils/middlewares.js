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

const errorHandler = (error, req, res, next) => {
    console.error('Error middleware log:',error.message)
    if(error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError' ) {
      return res.status(400).send({ error: error.message })
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name ===  'JsonWebTokenError') {
        return res.status(401).json({ error: 'token invalid' })
      }else if(error.message === 'PasswordLengthError') {
        return res.status(401).json({error: `Password is too short, minimun is (3) but you typed (${req.body.password.length}) char`})
      }
  
    next(error)
  }

module.exports = {
    info,
    error,
    errorHandler
}