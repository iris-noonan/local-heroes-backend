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
        return res.status(201).json(helper)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// * Index


// * Show


// * Update


// * Delete


module.exports = router