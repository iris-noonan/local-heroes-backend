const mongoose = require('mongoose')

// ! Testimonials schema
const testimonialSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true }
)

// ! Helper schema
const helperSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    profileDesc: { type: String, required: true },
    availability: String,
    pauseMyProfile: Boolean,
    // skills: {
    //     type: String,
    //     enum: []
    // },
    // jobsCompleted: [],
    testimonials: [testimonialSchema],
}, {
    timestamps: true
})

const Helper = mongoose.model('Helper', helperSchema)

module.exports = Helper