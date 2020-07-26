/*
Model Class that export the mongoose model of the tab
*/
const mongoose = require('mongoose')
const Tab = mongoose.model('Tab', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dataPoints :  [{
        dataType : String,
        label : String,
        description:String,
        options:[String]
         
    }
        ]
    
    
})
module.exports = Tab
