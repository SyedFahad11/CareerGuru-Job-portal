const express = require("express");
const Jobs = require('../../models/Jobs');
const SavedJobs = require('../../models/Seeker/SavedJobs')
const AppliedJobs = require('../../models/Seeker/AppliedJobs')
const fetchuser = require('../../middleware/fetchuser');

const router = express.Router();


router.get("/availableJobs", fetchuser, async (req, res) => {
    try {

        const availableJobs = await Jobs.find();

        const user_id = req.user.id;

        const appliedJobIds = await AppliedJobs.distinct('arr.job_id', { _id: user_id });

        const savedJobIds = await SavedJobs.distinct('arr.job_id', { _id: user_id });


        // Iterate through available jobs and add 'type' field
        const jobsWithTypes = availableJobs.map(job => {
            let type = 'empty';
            if (appliedJobIds.includes(job._id.toString())) {
                type = 'applied';
            } else if (savedJobIds.includes(job._id.toString())) {
                type = 'saved';
            }
            return { ...job.toObject(), type };
        });

        res.json(jobsWithTypes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/savedJobs', fetchuser, async (req, res) => {
    try {


        const userId = req.user.id;
        const jobId = req.body.job_id;

        let user = await SavedJobs.findOne({ _id: userId });
        if (user) {

            let flag = false;

            user.arr.forEach((obj) => {
                if (obj.job_id === jobId) flag = true;
                console.log(obj)
            })

            if (!flag) {
                const newObject = { job_id: jobId }
                const response = await SavedJobs.findByIdAndUpdate({ _id: userId }, { $push: { arr: newObject } }, { new: true })

            }

        }
        else {
            const response = await SavedJobs.create({
                _id: req.user.id,
                arr: [{
                    job_id: jobId
                }]
            })

        }

        res.send("Saved Job")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

router.get('/savedJobs', fetchuser, async (req, res) => {
    try {


        const savedJobsData = await SavedJobs.findById(req.user.id);
        const Array = []
        //Array.push({salary:"56"})
        const asyncResolution = await Promise.all(savedJobsData.arr.map(async (obj) => {
            const eachData = await Jobs.findById(obj.job_id);
            Array.push(eachData)

        })
        )


        res.send(Array)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
router.post('/savedJobs/delete', fetchuser, async (req, res) => {
    try {


        const userId = req.user.id;
        const jobId = req.body.job_id;

        let user = await SavedJobs.findOne({ _id: userId });
        const newObject = { job_id: jobId }
        const response = await SavedJobs.updateOne({ _id: userId }, { $pull: { arr: newObject } }, { safe: true }, function (err, obj) {
            if (err) console.log(err)
            else console.log("Deleted Successfully!")
        })


        res.send("HI")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})




module.exports = router