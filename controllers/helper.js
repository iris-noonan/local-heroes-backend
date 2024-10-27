const express = require('express')
const router = express.Router()

// Models
const Helper = require('../models/helper')

// ! Routes

// * Create
router.post('/', async (req, res) => {
    try {
        // req.body.user = req.user._id
        const helper = await Helper.create(req.body)
        // helper._doc.user = req.user
        return res.status(201).json(helper)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// * Index
router.get('/', async (req, res) => {
    try {
        const helpers = await Helper.find()
            // .populate('user')
            .sort({ createdAt: 'desc' })
        return res.status(200).json(helpers)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// * Show


// * Update


// * Delete


module.exports = router