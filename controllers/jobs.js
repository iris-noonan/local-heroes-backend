

const express = require('express');
const router = express.Router();

//!--- Model
const Job = require('../models/job')


//!--- Middleware



//!--- Public and Private Routes
// ========== Public Routes =========== above router.use(varifyToken)




// ========= Protected Routes =========  under router.use(varifyToken)

// router.use(verifyToken);

//*--- Job Create  CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.post('', async (req, res) => {
    try {
        // req.body.user = req.user._id
        const job = await Job.create(req.body)
        job._doc.user = req.user
        return res.status(201).json(job)
    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//*--- Job Index   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.get('', async (req, res) => {
    try {
        const jobs = await Job.find()//.populate('user').populate('skill')
        .sort({ createdAt: 'desc'})
        return res.json(jobs)
    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//*---  Job Show   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.get('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId)//.populate('user').populate('skill')
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        //!---Return if found
        return res.json(job)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})
//*--- Job Update   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.put('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        
        //!---Find
        const job = await Job.findById(jobId)//.populate('user').populate('skill')
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found.')

        //!---Authorize
        // if(!job.user.equals(req.user._id)) {
        //     throw new Forbidden('Request user does not match author id.') 
        // }
        // Make the update
        Object.assign(job, req.body)

        // Save
        await job.save()

        //!---Return
        return res.json(job)

    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
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
        // if (!job.user.equals(req.user._id)) {
        //     throw new Forbidden('Request user does not match author id.')
        // }
        
        //!---Delete
        const deletedJob = await Job.findByIdAndDelete(jobId)

        //!---Return
        return res.json(deletedJob)

    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//*--- 


//!--- Export
module.exports = router