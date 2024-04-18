// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const {find,
    findById,
    insert,
    update,
    remove,
    resetDB} = require('./users/model.js')

server.use(express.json())

// get all users
server.get('/api/users', async (req, res) => {
    const users = await find()
    res.status(200).json(users)
})

// get specific user 
server.get('/api/users/:id', async (req, res) => {
    try {
        const getUser = await findById(req.params.id)
        console.log(req.params.id)
        console.log(getUser)
        if (getUser) {
            res.status(200).json(getUser)
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    } catch (err) {
        res.status(500).json({message: `Error on server: ${err.message}`})
    }
})

// post a new user 
server.post('/api/users', async (req, res) => {
    try{
        const newUser = await insert(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({message: `Error on server: ${err.message}`})
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
