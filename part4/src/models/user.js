const { default: mongoose, Mongoose } = require("mongoose");

const _userSchema = {
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        message: 'Username should contain more than 3 char'
    },
    name: {
        type: String, 
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minLength: 3,
        message: 'Password should contain more than 3 char'
    },

    blogs: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Blog'
        }
    ]
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