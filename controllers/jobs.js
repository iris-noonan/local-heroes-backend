

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const upload = require('../middleware/image-upload.js')

//!--- Model
const Job = require('../models/job')

//!--- Utilities
const { sendError, NotFound, Forbidden, Unauthorized } = require('../utils/errors')

//!--- Middleware
const verifyToken = require('../middleware/verify-token')


//!--- Public and Private Routes
// ========== Public Routes =========== above router.use(varifyToken)




// ========= Protected Routes =========  under router.use(varifyToken)

router.use(verifyToken);

//!---MAIN JOB SECTION

//////!POSSIBLY THEN NEW ERROR HANDLING FOR IMAGES
//*--- Job Create  CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.post('/', upload.single('image'), async (req, res) => {//Setting up the post route
    try {
        req.body.user = req.user._id //asigning the user as the current user
        // Image
        if (!req.file) return res.status(422).json({ image: 'valid image file was not provided' })
        //custom error message could be added
        req.body.image = req.file.path      

        const job = await Job.create(req.body) // creating job variable linked to db opperation
        job._doc.user = req.user // asigning the user info to req.user
        return res.status(201).json(job) // returning the response with the new job data
    //Error handling
    } catch (error) { 
        sendError(error, res)
    }
})

//*--- Job Index   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find()//.populate('user').populate('skill') // Populating the user and skill data into the job so all is displayed.
        .sort({ createdAt: 'desc'})  //soring the jobs by default based on most recently added.
        return res.json(jobs)
    } catch (error) {
        sendError(error, res)
    }
})

//*---  Job Show   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.get('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId).populate('user').populate('comments.user')
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        //!---Return if found
        return res.json(job)
        
    } catch (error) {
        sendError(error, res)
    }
})
//*--- Job Update   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.put('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        
        //!---Find
        const job = await Job.findById(jobId).populate('user')//.populate('skill')
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found.')

        // !---Authorize
        if(!job.user.equals(req.user._id)) {
            throw new Forbidden('Request user does not match author id.') 
        }
        // Make the update
        Object.assign(job, req.body)

        // Save
        await job.save()

        //!---Return
        return res.json(job)

    } catch (error) {
        sendError(error, res)
    }
})


//*--- Job Delete  CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.delete('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId)
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        
            //!---Authorize
        if (!job.user.equals(req.user._id)) {
            throw new Forbidden('Request user does not match author id.')
        }
        
        //!---Delete
        const deletedJob = await Job.findByIdAndDelete(jobId)

        //!---Return
        return res.json(deletedJob)

    } catch (error) {
        sendError(error, res)
    }
})

//!---COMMENTS SECTION

//*---Comment Create CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.post('/:jobId/comments', async (req, res) => {
    try {
    req.body.user = req.user._id;
    const job = await Job.findById(req.params.jobId);
    //Add the new comment
    job.comments.push(req.body);
    await job.save();
    //Respond with the new comment 
    const newComment = job.comments[job.comments.length -1];
    newComment._doc.user = req.user;
    return res.status(201).json(newComment);

    } catch(error) {
        sendError(error, res)
    }
})

//*---Comment Update CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.put('/:jobId/comments/:commentId', async (req, res) => {
    try {
        req.body.user = req.user._id;
        const job = await Job.findById(req.params.jobId);
        const comment = job.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await job.save();
        return res.status(200).json({ message: 'Ok' })
    } catch(error) {
        sendError(error, res)
    }
});

//*---Comment Delete CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.delete('/:jobId/comments/:commentId', async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        job.comments.remove({ _id: req.params.commentId });
        await job.save();
        return res.status(200).json({ message: 'Deleted'})
    } catch (error) {
        sendError(error, res)
    }
})


//!--- Export
module.exports = router