const express = require('express')
require('./db/mongoose') //We are not using its object so calling it like this
//Requiring or importing all the model objects i-e User,Task,Tab from model class 
const User = require('./models/user')
const Task = require('./models/task')
const Tab = require('./models/tab')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // This is a middle function that convert the oncoming json into object 

/*
It would be much nicer if we create a seperate route file and place all our routes into that
*/

//Route for the creation of the user 
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Route for the creation of the task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Route for the creation of the tabs Data
app.post('/tabs', (req, res) => {
    const tab = new Tab(req.body)

    tab.save().then(() => {
        res.send(tab)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// Reading list of  Users 
app.get('/users', (req, res) => {

    User.find({}).then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(500).send();
    })
})
// Reading a single  User
app.get('/users/:id', (req, res) => {
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

//Reading the list of all tasks 
app.get('/tasks', (req, res) => {

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
app.get('/tasks/:id', (req, res) => {
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

//Reading all the list of Tabs
app.get('/tabs', (req, res) => {
    Tab.find({}).then((tab) => {
        if (!tab) {
            res.send('No tab found')
        }
        res.send(tab)
    }).catch((error) => {
        res.status(500).send()
    })
})

//Reading a single Tab
app.get('/tabs/:id', (req, res) => {

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

//Update a User
app.patch('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Update a Task
app.patch('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }).then((task) => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


//Update a Tasb
app.patch('/tabs/:id', (req, res) => {

    const _id = req.params.id
    Tab.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }).then((tab) => {
        res.send(tab)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Delete a User
app.delete('/users/:id', (req, res) => {
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


//Delete a Task
app.delete('/tasks/:id', (req, res) => {
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

//Delete a Tab
app.delete('/tabs/:id', (req, res) => {
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


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


