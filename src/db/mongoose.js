//This files lets us connect to our Database
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})
