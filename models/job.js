const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    description: {type: String, required: true },
    // skill: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Skill',
    //     required: true
    // },
    completed: Boolean,
    appreciation: Boolean,
    image: String,
    // user: {
    //     // type: mongoose.SchemaTypes.ObjectId,
    //     // ref: 'User',
    //     // required: true
    // },
    // helper: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Helper',
    //     required: false
    // }
    }, {
        timestamps: true
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job