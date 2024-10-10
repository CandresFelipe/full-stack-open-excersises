const cors = require('cors')
var morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./src/models/persons')
const crypto = require('node:crypto')

const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '.env')})

const uri = process.env.MONGO_URI

mongoose.connect(uri).then((res) => {
  console.log('connected to MongoDB')
}).catch((err) => console.log('Connection Error', err))


morgan.token('reqBody', (req, res) => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, req, res, next) => {
  console.error('Error middleware log:',error.message)
  if(error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }else if(error.name === 'ValidationError' ) {
    return res.status(400).send({error: error.message})
  }

  next(error)
}

const morganMddware = morgan(':method :url :status :res[content-length] - :response-time ms :reqBody')

const app = express()

app.use(express.json())
app.use(morganMddware)
app.use(cors())
app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.send('<h1>Hello world!@!!</h1>')
})

app.get('/api/persons',(req, res) => {
    Person.find({}).then((result) => {
      [result].forEach(element => {
          res.json(element)        
      });
    })
})

app.get('/info', (req, res) => {
  const numOfPeople = persons.length
  let time = undefined
  if(req) {
    time = new Date()
  }
  res.send(`<div><p>Phonebook has info for ${numOfPeople} people</p><p>${time}</p></div>`)
  res.end()
})

app.get('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  Person.findOne({id}).then((p) => {
    if(!p) {
      res.status(404).send('<h2>Person not found</h2>').end()
    }
    res.json(p).end()
  }).catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.deleteOne({ id: id }).then(() => {
    res.status(204)
    res.end()
  }).catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if(!(body.name || body.number)) {
    return res.status(400).json({
      error: 'Required fields name and/or number are missing'
    })
  }
    const randomId = crypto.randomUUID()
    const newPerson = new Person({
      id: randomId,
      name: body.name,
      number: body.number
    })

    newPerson.save().then(() => console.log('Person added!')).catch((err) => next(err))
})

app.put('/api/persons', (req, res, next) => {
  const body = req.body
  if(!(body.name || body.number)) {
    return res.status(400).json({
      error: 'Required fields name and/or number are missing'
    })
  } 
  Person.updateOne({name: body.name}, {name: body.name, number: body.number}, {
    runValidators: true,  context: 'query'
  }).then((p) => {
    res.json(p)
  }).catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT,() =>{
    const publicUrl = process.env.RENDER_EXTERNAL_URL;
    console.log('Backend URL', publicUrl)
    console.log(`Server running on port ${PORT}`)
})