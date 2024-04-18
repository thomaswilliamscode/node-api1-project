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

server.get('/', (req, res) => {
    res.send('connected to root!')
})

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
            res.status(404).json({message: `/does not exist/`})
        }
    } catch (err) {
        res.status(500).json({message: `Error on server: ${err.message}`})
    }
})

// post a new user 
server.post('/api/users', async (req, res) => {
    try{
        if (req.body.name && req.body.bio) {
            const newUser = await insert(req.body)
            res.status(201).json(newUser)
        } else {
            res.status(400).json({message: '/provide name and bio/'})
        }
    } catch (err) {
        res.status(500).json({message: `Error on server: ${err.message}`})
    }
})

// put on existing user
server.put('/api/users/:id', async (req, res) => {
    try {
        if (req.body.name && req.body.bio) {
            const user = await update(req.params.id, req.body);
            if (user) {
                res.status(400).json(user);
            } else {
                res.status(404).json({ message: `/does not exist/` });
            }
		} else {
            res.status(400).json({message: '/provide name and bio/'})
        }
    } catch (err) {
        res.status(500).json({message: `Error on server: ${err.message}`})
    }
})

// delete a user 
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deleteUser = await remove(req.params.id);
		if (deleteUser) {
			res.status(200).json(deleteUser);
		} else {
			res.status(404).json({ message: `/does not exist/` });
				}
    } catch (err) {
        res.status(500).json({ message: `Error on server: ${err.message}` });
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
