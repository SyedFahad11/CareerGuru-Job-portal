const express = require("express");
const Jobs = require('../models/Jobs');
const SavedJobs = require('../models/SavedJobs')
const fetchuser = require('../middleware/fetchuser');
const Recruiter = require("../models/Recruiter");

const router = express.Router();

//ROUTE:1 Add Jobs
router.post("/addJob", fetchuser, async (req, res) => {
    try {
        // console.log(req.body);
        const { title,location, salary, description,category, contractType} = req.body;
        const recId = req.user.id;
        console.log(recId);
        const {companyName}=await Recruiter.findOne({_id:recId});


        Jobs.create({
            recId, title, location,salary, description,category, contractType,companyName
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

router.get("/availableJobs", (req, res) => {
    try {
        const availableJ = Jobs.find((err, data) => {
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

        res.send("HI")
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

router.post('/updateJob', async (req, res) => {
    //find by id and update Job
    const jobId = req.headers.jobid;
    var job = await Jobs.findById(jobId);


    console.log(job)

    const { title, salary, postedBy, workingHours, description, contact } = req.body;
    const newObject = {}
    if (title !== job.title) newObject.title = title;
    if (salary !== job.salary) newObject.salary = salary;
    if (postedBy !== job.postedBy) newObject.postedBy = postedBy;
    if (workingHours !== job.workingHours) newObject.workingHours = workingHours;
    if (description !== job.description) newObject.description = description;
    if (contact !== job.contact) newObject.contact = contact;

    const newJobDetails = await Jobs.findByIdAndUpdate(jobId, { $set: newObject }, { new: true })
    console.log(newJobDetails)
    //Create user with new details
    res.send({ obj: "value" })
})

router.post('/deleteJob', async (req, res) => {
    try {
        const jobId = req.headers.jobid;
        console.log(jobId);

        var response=Jobs.findByIdAndDelete(jobId,(err,res)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }

        })

        res.send("HI")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router