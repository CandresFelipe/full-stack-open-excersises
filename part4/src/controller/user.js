const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/sign-up', async (request, response) => {
    const {userName, name, password } = request.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        name,
        userName,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).send(savedUser)

})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes')

    response.status(200).json(users)
})

module.exports = userRouter