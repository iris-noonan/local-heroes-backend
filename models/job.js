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
    tile: {type: String, required: true},
    description: {type: String, required: true },
    // skill: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Skill',
    //     required: true
    // },
    image: String,
    completed: Boolean,
    appreciation: Boolean,
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