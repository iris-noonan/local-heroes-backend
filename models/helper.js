const mongoose = require('mongoose')

const helperSchema = new mongoose.Schema({
    helperName: { type: String, required: true },
    // user: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    profileDesc: { type: String, required: true },
    isAvailable: Boolean,
    // skills: x,
    // jobsCompleted: x,
    // testimonials: x,
}, {
    timestamps: true
})

const Helper = mongoose.model('Helper', helperSchema)

module.exports = Helper