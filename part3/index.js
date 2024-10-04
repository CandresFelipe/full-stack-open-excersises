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

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello world!@!!</h1>')
})

app.get('/api/persons',(req, res) => {
    res.json(persons)
})

// app.get('/api/persons/:id', (req, res) => {
//     const id = req.params.id
//     const note = persons.find(note => note.id === id)
//     if(!note) {
//         res.status(404).send('<h1>Note was not found!</h1>').end()
//     }
//     res.json(note)
// })

// app.delete('/api/persons/:id', (req, res) => {
//     const id = req.params.id
//     notes = notes.filter((note) => note.id !== id)
//     res.status(204).end()
// })

// app.post('/api/persons', (req, res) => {
//   const body = req.body

//   if(!body.content) {
//     return res.status(400).json({
//       error: 'Content missing'
//     })
//   }

//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0

//   newNote.id = String(maxId + 1)
//   const newNote = {
//     id: String(maxId + 1),
//     content: body.content,
//     important: Boolean(body.important) || false
//   }
//   notes = notes.concat(newNote)
//   console.log(newNote)
//   res.json(newNote)

// })

const PORT = 3001

app.listen(PORT,() =>{
    console.log(`Server running on port http://localhost:${PORT}`)
})