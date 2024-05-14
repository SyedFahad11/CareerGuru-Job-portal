const express = require("express");
const Jobs = require('../../models/Jobs');
const SavedJobs = require('../../models/Seeker/SavedJobs')
const SeekerAppliedJobs = require('../../models/Seeker/AppliedJobs')
const RecruiterJobs = require('../../models/Recruiter/AppliedJobs')
const Application = require('../../models/Application')
const fetchuser = require('../../middleware/fetchuser');
const seekerAppliedJobs = require("../../models/Seeker/AppliedJobs");

const router = express.Router();


router.get("/availableJobs", fetchuser, async (req, res) => {
    try {


        const user_id = req.user.id;
        const availableJobs = await Jobs.find();

        const applicationIds = await SeekerAppliedJobs.distinct('arr._id', { _id: user_id });


        const appliedJobIds = [];
        
        await Promise.all( applicationIds.map(async (id) => {
            const application = await Application.findById(id);
            appliedJobIds.push(application.jobId);
        }));

        console.log(appliedJobIds);

        const savedJobIds = await SavedJobs.distinct('arr.job_id', { _id: user_id });


        // Iterate through available jobs and add 'type' field
        const jobsWithTypes = await Promise.all( availableJobs.map((job) => {
            let type = 'empty';
            for (const appliedJobId of appliedJobIds) {
                if (appliedJobId === job._id.toString()) {
                    type = 'applied';
                    break;
                }
            }
            if (type === 'empty') {
                for (const savedJobId of savedJobIds) {
                    if (savedJobId === job._id.toString()) {
                        type = 'saved';
                        break;
                    }
                }
            }
            return { ...job.toObject(), type };
        }));



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

        const seekerId = req.user.id;
        const savedJobsData = await SavedJobs.findById(seekerId);
        const Array = []

        const applicationIds = await SeekerAppliedJobs.distinct('arr._id', { _id: seekerId });
        const appliedJobIds = [];
        applicationIds.map(async (id) => {
            const application = await Application.findById(id);
            appliedJobIds.push(application.jobId);
        })

        const asyncResolution = await Promise.all(savedJobsData.arr.map(async (obj) => {

            const eachData = await Jobs.findById(obj.job_id);
            //console.log(eachData);

            let type = null;
            if (appliedJobIds.includes(eachData._id.toString())) {
                type = 'applied';
            } else {
                type = 'saved';
            }
            const newData = { type, ...eachData._doc }
            Array.push(newData)

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

router.post('/applyJob', fetchuser, async (req, res) => {
    try {
        const seekerId = req.user.id;
        const jobId = req.body.job_id;

        const job = await Jobs.findById(jobId);
        const recId = job.recId;

        // Check if the application already exists
        let application = await Application.findOne({ recId, seekerId, jobId });

        if (application === null) {
            const sop = req.body.sop;
            const status = "Pending";
            const message = null;
            application = await Application.create({ recId, seekerId, jobId, sop, status, message });
        } else {
            res.status(400).send("Application Already Present");
            return;
        }

        const applicationId = application._id;

        // Array to store promises for all database operations
        const promises = [];

        // Update SeekerAppliedJobs collection
        let seeker = await SeekerAppliedJobs.findOne({ _id: seekerId });
        if (seeker) {
            const newObject = { _id: applicationId };
            promises.push(SeekerAppliedJobs.findByIdAndUpdate({ _id: seekerId }, { $push: { arr: newObject } }, { new: true }));
        } else {
            promises.push(SeekerAppliedJobs.create({ _id: seekerId, arr: [{ _id: applicationId }] }));
        }


        let recruiter = await RecruiterJobs.findOneAndUpdate(
            { _id: recId, "jobArr.jobId": jobId },
            { $push: { "jobArr.$.appliArr": { _id: applicationId } } },
            { new: true }
        );

        if (!recruiter) {

            promises.push(RecruiterJobs.create({ _id: recId, jobArr: [{ jobId: jobId, appliArr: [{ _id: applicationId }] }] }));
        }


        // Wait for all database operations to complete
        await Promise.all(promises);

        // Send response
        res.send("Applied Job");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})
router.get('/appliedJobs', fetchuser, async (req, res) => {
    try {

        const seekerId = req.user.id;
        const appliedJobsData = await SeekerAppliedJobs.findById(seekerId);

        const Array = []
        //Array.push({salary:"56"})
        const asyncResolution = await Promise.all(appliedJobsData.arr.map(async (obj) => {
            const applicationData = await Application.findById(obj._id);

            const jobData = await Jobs.findById(applicationData.jobId);

            const data = { ...applicationData._doc, ...jobData._doc };

            Array.push(data)

        })
        )


        res.send(Array)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
router.delete('/delete', async (req, res) => {
    try {
        await Application.deleteMany({})
            .then((result) => {
                console.log(`${result.deletedCount} documents deleted.`);
            })
            .catch((error) => {
                console.error('Error deleting documents:', error);
            });
        await seekerAppliedJobs.deleteMany({})
            .then((result) => {
                console.log(`${result.deletedCount} documents deleted.`);
            })
            .catch((error) => {
                console.error('Error deleting documents:', error);
            });
        await RecruiterJobs.deleteMany({})
            .then((result) => {
                console.log(`${result.deletedCount} documents deleted.`);
            })
            .catch((error) => {
                console.error('Error deleting documents:', error);
            });

        res.send("Deleted Successfully")


    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");

    }
}
)




module.exports = router