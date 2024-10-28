const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

// Models
const Helper = require('../models/helper')
const verifyToken = require('../middleware/verify-token')

const { sendError, NotFound, Forbidden } = require('../utils/errors')

// ! Routes

router.use(verifyToken)

// * Create
router.post('/', async (req, res) => {
    try {
        req.body.user = req.user._id
        const helper = await Helper.create(req.body)
        helper._doc.user = req.user
        return res.status(201).json(helper)
    } catch (error) {
        sendError(error, res)
    }
})

// * Index
router.get('/', async (req, res) => {
    try {
        const helpers = await Helper.find()
            .populate('user')
            .sort({ createdAt: 'desc' })
        return res.json(helpers)
    } catch (error) {
        sendError(error, res)
    }
})

// * Show
router.get('/:helperId', async (req, res) => {
    try {
        const { helperId } = req.params

        const helper = await Helper.findById(helperId).populate('user')
        
        if (!helper) throw new NotFound('Helper profile not found')
        
        return res.json(helper)
    } catch (error) {
        sendError(error, res)
    }
})

// * Update
router.put('/:helperId', async (req, res) => {
    try {
        const { helperId } = req.params

        const helper = await Helper.findById(helperId)
        
        if (!helper) throw new NotFound('Helper profile not found')

        if (!helper.user.equals(req.user._id)) {
            throw new Forbidden('You can only edit your own helper profile')
        }

        Object.assign(helper, req.body)
        await helper.save()

        helper._doc.user = req.user

        return res.json(helper)
    } catch (error) {
        sendError(error, res)
    }
})

// * Delete
router.delete('/:helperId', async (req, res) => {
    try {
        const { helperId } = req.params

        const helper = await Helper.findById(helperId)
        
        if (!helper) throw new NotFound('Helper profile not found')

        if (!helper.user.equals(req.user._id)) {
            throw new Forbidden('You can only delete your own helper profile')
        }

        const deletedHelper = await Helper.findByIdAndDelete(helperId)

        return res.json(deletedHelper)

    } catch (error) {
        sendError(error, res)
    }
})

module.exports = router