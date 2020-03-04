const express = require('express')
const router = express.Router()
const multer = require('multer')
const entrySchema = require('../models/schema')
const path = require('path')
const upload = multer({
    dest: path.join(__dirname, '../uploads')
})

const searchRange = 1

// Get webpage
router.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../index.html'))
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/location', async (req, res) => {
    try {
        var latrange = {$lte: req.query.lat + searchRange, $gte: req.query.lat - searchRange}
        var lonrange = {$lte: req.query.lon + searchRange, $gte: req.query.lat - searchRange}
        const restest = await entrySchema.find({latitude: latrange, longitude: lonrange })
        console.log(restest)
        res.status(201).json(restest)
    } catch {
        res.status(400).json({message: error.message})
    }
})

// Get image specified by name
router.get('/image', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../uploads/', req.query.filename))
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Upload form to database
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