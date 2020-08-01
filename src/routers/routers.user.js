const express = require('express')
//Requiring or importing all the model objects i-e User,Task,Tab from model class 
const User = require('../models/user')
const app = express()
const router = new express.Router()

//Route for the creation of the user 
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
    
})

// Reading list of  Users 
router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(500).send();
    }

})

// Reading a single  User
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

//Update a User
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        res.send(user)
    } catch (error) {
        res.status(400).send(e)
    }

})

//Delete a User
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(400).send("No such user exist")
        }

        res.send("succesfully delete")
    } catch (error) {

    }

})

module.exports = router