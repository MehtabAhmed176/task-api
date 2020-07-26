const express = require('express')

//Requiring or importing all the model objects i-e User,Task,Tab from model class 
const Task = require('../models/task')
const app = express()
const router=new express.Router()

//Route for the creation of the task
router.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Reading the list of all tasks 
router.get('/tasks', (req, res) => {

    Task.find({}).then((task) => {

        if (!task) {
            res.send('No task found')
        }
        res.send(task)
    }).catch((err) => {
        res.statusCode().send('There is some problem')
    })

})


// Reading a single  Task
router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch(() => {
        res.status(500).send("Problem with Server")
    })
})


//Update a Task
router.patch('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }).then((task) => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Delete a Task
router.delete('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findByIdAndDelete(_id).then((task) => {
        if (!task) {
            res.status(400).send("No task with this id exists")
        }
        res.send("succesfully delete")
    }).catch(() => {
        res.send(" Delete failed")
    })
})


module.exports=router
