const personRouter = require('express').Router()
const crypto = require('node:crypto')
const Person = require('../models/person')

personRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id
  Person.findOne({ id }).then((p) => {
    if(!p) {
      res.status(404).send('<h2>Person not found</h2>').end()
    }
    res.json(p).end()
  }).catch((err) => next(err))
})

personRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Person.deleteOne({ id: id }).then(() => {
    res.status(204)
    res.end()
  }).catch((err) => next(err))
})

personRouter.post('/', (req, res, next) => {
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

personRouter.put('/', (req, res, next) => {
  const body = req.body
  if(!(body.name || body.number)) {
    return res.status(400).json({
      error: 'Required fields name and/or number are missing'
    })
  }
  Person.updateOne({ name: body.name }, { name: body.name, number: body.number }, {
    runValidators: true,  context: 'query'
  }).then((p) => {
    res.json(p)
  }).catch(err => next(err))
})

module.exports = personRouter