const express = require('express')
const router = express.Router()
const multer = require('multer')
const entrySchema = require('../models/schema')
const path = require('path')
const upload = multer({
    dest: path.join(__dirname, '../uploads')
})

// Get webpage
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
})

// Upload photo
router.post('/', upload.single('file-to-upload'), async(req, res) => {
    const entry = new entrySchema({
        title: req.body.title,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        comments: [],
        img: req.file.filename
    })
    try {
        const newLocation = await entry.save()
        res.status(201).json(newLocation)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

module.exports = router