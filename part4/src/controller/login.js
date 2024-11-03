const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/log-in', async (req, res) => {
    const { userName, password } = req.body

    const user = await User.findOne({ userName })

    const passwordCorrect = user === null ? false : bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid user name or password'
        })
    }

    const userForToken = {
        userName: user.userName,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({token, username: user.userName, name: user.name })
})

module.exports = loginRouter