const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post('/sign-up', async (request, response, next) => {
    const {userName, name, password } = request.body


    try {

        if(password.length <= 3) {
            throw Error('PasswordLengthError')
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        userName,
        name,
        passwordHash
    })


    const jwtoken = jwt.sign({userName, userId: user.id}, process.env.SECRET)

    const savedUser = await user.save()

    response.status(201).send({token: jwtoken, user: savedUser})
    }catch (err) {
        next(err)
    } 
})

userRouter.get('/', async (request, response) => {

    const userId = request.user.id;
    
    const users = await User.find({ id: userId })

    response.status(200).json(users)
})

module.exports = userRouter