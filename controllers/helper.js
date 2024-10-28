const express = require('express')
const router = express.Router()

// Models
const Helper = require('../models/helper')
const { default: mongoose } = require('mongoose')

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
        return res.json(helpers)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// * Show
router.get('/:helperId', async (req, res) => {
    try {
        const { helperId } = req.params

        //can remove this line and the same in other routes if/when we implement error handling util
        if (!mongoose.Types.ObjectId.isValid(helperId)) {
            return res.status(400).json({ error: 'Invalid Helper profile ID' })
        }

        //Need to populate the user once that has been integrated! .populate('user')
        const helper = await Helper.findById(helperId)
        
        if (!helper) return res.status(404).json({ error: 'Helper profile not found' })
        
        return res.json(helper)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// * Update
router.put('/:helperId', async (req, res) => {
    try {
        const { helperId } = req.params

        if (!mongoose.Types.ObjectId.isValid(helperId)) {
            return res.status(400).json({ error: 'Invalid Helper profile ID' })
        }

        const helper = await Helper.findById(helperId)
        
        if (!helper) return res.status(404).json({ error: 'Helper profile not found' })

        // if (!helper.user.equals(req.user._id)) {
        //     return res.status(403).json('You can only edit your own helper profile')
        // }

        Object.assign(helper, req.body)
        await helper.save()

        // helper._doc.user = req.user

        return res.json(helper)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// * Delete
router.delete('/:helperId', async (req, res) => {
    try {
        const { helperId } = req.params

        if (!mongoose.Types.ObjectId.isValid(helperId)) {
            return res.status(400).json({ error: 'Invalid Helper profile ID' })
        }

        const helper = await Helper.findById(helperId)
        
        if (!helper) return res.status(404).json({ error: 'Helper profile not found' })

        // if (!helper.user.equals(req.user._id)) {
        //     return res.status(403).json('You can only delete your own helper profile')
        // }

        const deletedHelper = await Helper.findByIdAndDelete(helperId)

        return res.json(deletedHelper)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router