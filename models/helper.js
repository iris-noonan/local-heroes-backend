const mongoose = require('mongoose')

// add testimonials schema here

const helperSchema = new mongoose.Schema({
    helperName: { type: String, required: true, unique: true },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    profileDesc: { type: String, required: true },
    isAvailable: Boolean,
    // skills: {
    //     type: String,
    //     enum: []
    // },
    // jobsCompleted: [],
    // testimonials: [testimonialSchema],
}, {
    timestamps: true
})

const Helper = mongoose.model('Helper', helperSchema)

module.exports = Helper