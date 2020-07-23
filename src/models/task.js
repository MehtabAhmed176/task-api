/*
Model Class that export the mongoose model of the task
It has two field 
description and completed
*/
const mongoose = require('mongoose')
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task