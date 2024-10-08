const cors = require('cors')
var morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./src/models/persons')

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

const morganMddware = morgan(':method :url :status :res[content-length] - :response-time ms :reqBody')

const app = express()

app.use(express.json())
app.use(morganMddware)
app.use(cors())

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

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)

  if(!person) {
    return res.status(404).send('<h2>Person not found</h2>')
  }
  
  res.status(200).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const toDeletePerson = persons.find((p) => p.id === id)
  if(!toDeletePerson) {
    return res.sendStatus(404)
  }
  persons = persons.filter((p) => p.id !== id)

  res.status(204)
  res.end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!(body.name || body.number)) {
    return res.status(400).json({
      error: 'Required fields name and/or number are missing'
    })
  } 
  Person.find({ name: body.name }).then((result) => {
    if(result.name === body.name) {
      return res.status(400).send({error: 'Name already exists!'})
    }
  })

    const randomId = Math.floor(Math.random() * 1000)
    const newPerson = new Person({
      id: randomId,
      name: body.name,
      number: String(body.number)
    })

    newPerson.save().then(() => console.log('Person added!')).catch((err) => console.log('Error in saving the entry', err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})