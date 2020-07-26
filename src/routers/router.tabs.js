const express = require('express')
//Requiring or importing all the model objects i-e User,Task,Tab from model class 
const Tab = require('../models/tab')
const app = express()
const router=new express.Router()

//Route for the creation of the tabs Data
router.post('/tabs', (req, res) => {
    const tab = new Tab(req.body)

    tab.save().then(() => {
        res.send(tab)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Reading a single Tab
router.get('/tabs/:id', (req, res) => {

    const _id = req.params.id
    Tab.findById(_id).then((tab) => {
        if (!tab) {
            res.send('No tab data found with this id')
        }
        res.send(tab)
        res.send(tab)
    }).catch((error) => {
        res.status(500).send('Server internal error', error)
    })
})


//Reading all the list of Tabs
router.get('/tabs', (req, res) => {
    Tab.find({}).then((tab) => {
        if (!tab) {
            res.send('No tab found')
        }
        res.send(tab)
    }).catch((error) => {
        res.status(500).send()
    })
})


//Update a Tasb
router.patch('/tabs/:id', (req, res) => {

    const _id = req.params.id
    Tab.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }).then((tab) => {
        res.send(tab)
    }).catch((e) => {
        res.status(400).send(e)
    })
})





//Delete a Tab
router.delete('/tabs/:id', (req, res) => {
    const _id = req.params.id
    Tab.findByIdAndDelete(_id).then((tabs) => {
        if (!tabs) {
            res.status(400).send("No tab with this id exists")
        }
        res.send("succesfully delete")
    }).catch(() => {
        res.send(" Delete failed")
    })
})

module.exports=router