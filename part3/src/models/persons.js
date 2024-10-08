const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    id: String,
    name: String,
    number: String
})

PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
} )

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person
