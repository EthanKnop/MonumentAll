const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
    title : String,
    latitude: Number,
    longitude: Number,
    comments: Array,
    img: String,
    

})

module.exports = mongoose.model('Locations', locationSchema)