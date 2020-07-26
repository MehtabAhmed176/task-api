const express = require('express')
//Requiring or importing all the model objects i-e User,Task,Tab from model class 
const User = require('../models/user')
const app = express()
const router=new express.Router()

//Route for the creation of the user 
router.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// Reading list of  Users 
router.get('/users', (req, res) => {

    User.find({}).then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(500).send();
    })
})

// Reading a single  User
router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

//Update a User
router.patch('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


//Delete a User
router.delete('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findByIdAndDelete(_id).then((user) => {
        if (!user) {
            res.status(400).send("No such user exist")
        }
        res.send("succesfully delete")
    }).catch(() => {
        res.send(" Delete failed")
    })
})

module.exports=router