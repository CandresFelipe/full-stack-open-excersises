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

const app = express()

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

const PORT = 3001

app.listen(PORT,() =>{
    console.log(`Server running on port http://localhost:${PORT}`)
})