const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },
    image:{
        type: String,
        trim: true,
        require: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Category',categorySchema)