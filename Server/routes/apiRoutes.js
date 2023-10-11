    const express = require("express");
    const Jobs = require('../models/Jobs');
    const SavedJobs = require('../models/SavedJobs')
    const fetchuser = require('../middleware/fetchuser');

    const router = express.Router();

    router.post("/newJob", (req, res) => {
        try {
            console.log(req.body);
            const { title, salary, postedBy, workingHours, description, contact } = req.body
            Jobs.create({
                title, salary, postedBy, workingHours, description, contact
            }, (err, res) => {
                if (err) console.log(err)
                else console.log("Added Successfully")
            })
            res.redirect("/")
            res.send("Successfull")

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
            const response = await SavedJobs.updateOne({ _id: userId }, { $pull: { arr: newObject } },{ safe: true}, function(err, obj){
                if(err)console.log(err)
                else console.log("Deleted Successfully!")
            })
            

            res.send("HI")
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })







    module.exports = router