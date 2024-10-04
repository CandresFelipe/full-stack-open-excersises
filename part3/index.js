const requestLogger = require('./middleware')
var morgan = require('morgan')
const express = require('express')

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


const morganMddware = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' \n')
})

const app = express()

app.use(express.json())
app.use(morganMddware)

app.get('/', (req, res) => {
    res.send('<h1>Hello world!@!!</h1>')
})

app.get('/api/persons',(req, res) => {
    res.json(persons)
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
  const hasNameAlready = persons.some((p) => p.name.toLowerCase() === body.name.toLowerCase())
  if(hasNameAlready) {
    return res.status(400).json({
      error: 'Name already existing in the registry'
    })
  }
    const randomId = Math.floor(Math.random() * 1000)
    const newPerson = {
      id: randomId,
      name: body.name,
      number: String(body.number)
    }
    persons = persons.concat(newPerson)
    res.json(newPerson)
  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT,() =>{
    console.log(`Server running on port http://localhost:${PORT}`)
})