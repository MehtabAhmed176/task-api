const express = require('express')

//Requiring or importing all the model objects i-e User,Task,Tab from model class 
const Task = require('../models/task')
const app = express()
const router = new express.Router()

//Route for the creation of the task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {

        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(e)
    }
})

//Reading the list of all tasks 
router.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        if (!task) {
            res.send('No task found')
        }
        res.send(task)
    } catch (error) {
        res.statusCode().send('There is some problem')
    }
})


// Reading a single  Task
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send("Problem with Server")
    }

})


//Update a Task
router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        res.send(task)
    } catch (error) {
        res.status(400).send(e)
    }
})

//Delete a Task
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            res.status(400).send("No task with this id exists")
        }
        res.send("succesfully delete")
    } catch (error) {
        res.send(" Delete failed")
    }

})


module.exports = router
