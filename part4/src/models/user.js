const { default: mongoose } = require("mongoose");

const _userSchema = {
    userName: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
}

const userSchema = new mongoose.Schema(_userSchema)

userSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v

        delete returnedObj.passwordHash
    }
})


const User = mongoose.model('User', userSchema)


module.exports = User