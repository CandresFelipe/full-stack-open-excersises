const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type:String,
    minLength: 8,
    validate: {
      validator: (v) => /^\d{1,2}-\d{2}-\d+$/.test(v),
      message: props => `${props.value} is not a valid phone number`
    },
    required: true
  }
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
