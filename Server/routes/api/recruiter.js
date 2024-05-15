const express = require("express");
const Jobs = require('../../models/Jobs');
const Recruiter = require("../../models/Recruiter/User");
const RecJobStats=require('../../models/Recruiter/AppliedJobs')
const fetchuser = require('../../middleware/fetchuser');

const router = express.Router();

//ROUTE:1 Add Jobs
router.post("/addJob", fetchuser, async (req, res) => {
    try {
        // console.log(req.body);
        const { title, location, salary, description, category, contractType } = req.body;
        const recId = req.user.id;
        console.log(recId);
        const { companyName } = await Recruiter.findOne({ _id: recId });


        Jobs.create({
            recId, title, location, salary, description, category, contractType, companyName
        }, (err, res) => {
            if (err) {
                console.log(err);
                res.status(400).send("Error in Adding")
            }
            else console.log("Added Successfully")
        })
        res.send({ "status": "Successfull" })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE:2 Fetch Current Posted Jobs by specific recruiter
router.get("/myPostedJobs", fetchuser, (req, res) => {
    try {
        const id = req.user.id;
        const availableJ = Jobs.find({ recId: id }, (err, data) => {
            if (err) console.log(err)
            else {
                res.json(data)
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/updateJob', async (req, res) => {
    //find by id and update Job
    const jobId = req.headers.jobid;
    var job = await Jobs.findById(jobId);


    console.log(job)

    const { title, location, salary, description, category, contractType } = req.body;
    const newObject = {}
    if (title !== job.title) newObject.title = title;
    if (location !== job.location) newObject.location = location;
    if (salary !== job.salary) newObject.salary = salary;
    if (description !== job.description) newObject.description = description;
    if (category !== job.category) newObject.category = category;
    if (contractType !== job.contractType) newObject.contractType = contractType;

    const newJobDetails = await Jobs.findByIdAndUpdate(jobId, { $set: newObject }, { new: true })
    console.log(newJobDetails)
    //Create user with new details
    res.send({ obj: "value" })
})

router.post('/deleteJob', async (req, res) => {
    try {
        const jobId = req.headers.jobid;
        console.log(jobId);

        var response = Jobs.findByIdAndDelete(jobId, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }

        })

        res.send("HI")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

router.get('/appliedJobs', fetchuser, async (req, res) => {
    try {

        const recId = req.user.id;
        const jobId=req.body.job_id;
        const recJobsData = await RecJobStats.findOne({ recId: recId, jobId: jobId });
        console.log(recJobsData);



        const Array = []
        //Array.push({salary:"56"})
       /*  const asyncResolution = await Promise.all(recJobsData.arr.map(async (obj) => {
            const applicationData = await Application.findById(obj._id);

            const jobData = await Jobs.findById(applicationData.jobId);

            const data = { ...applicationData._doc, ...jobData._doc };

            Array.push(data)

        })
        ) */


        res.send(Array)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router