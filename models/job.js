const mongoose = require('mongoose')

//!--- Comments Schema 
const commentSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);



//!--- Job Schema
const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true },
    location: { type: String, required: true },
    image: String,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    helper: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Helper',
        required: false
    },
    comments: [commentSchema]
    }, {
        timestamps: true
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job