const express = require("express");
const Jobs = require('../../models/Jobs');
const Recruiter = require("../../models/Recruiter/User");
const RecruiterJobs = require('../../models/Recruiter/AppliedJobs')
const Application = require('../../models/Application')
const Seeker = require('../../models/Seeker/User')
const Employee = require('../../models/Recruiter/Employee');
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

router.get('/applications', fetchuser, async (req, res) => {
    try {

        const recId = req.user.id;
        const jobId = req.headers.job_id;
        const recJobsData = await RecruiterJobs.findOne({ _id: recId });
        if (recJobsData) {
            const currJobApplications = recJobsData.jobArr.find(job => job._id === jobId);

            if (currJobApplications) {

                const applications = currJobApplications.appliArr;
                const seekers = [];
                await Promise.all(applications.map(async (each) => {
                    const appliInfo = await Application.findById(each._id).select('-recId ')
                    const seekerInfo = await Seeker.findById(appliInfo.seekerId).select('-password -email -_id');
                    seekers.push({ ...appliInfo._doc, ...seekerInfo._doc });
                }));

                res.send(seekers)
                return;

            } else {
                res.send("No Jobs Found");
                return;
            }

        } else {
            res.send("No Recruiter Found");
            return;
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/employeeStatus', async (req, res) => {
    const applicationId = req.body.appId;
    const status = req.body.status;
    const message = req.body.msg;


    const application = await Application.findByIdAndUpdate(applicationId, { status: status, message: message }, { new: true });
    const recId = application.recId;
    const seekerId = application.seekerId;
    if (status === 'Accepted') {
        let recruiterEmps = await Employee.findOne({ _id: recId });
        if (recruiterEmps) {
            let flag = false;
            recruiterEmps.arr.forEach((each) => {
                if (each._id === seekerId) {
                    flag = true;
                }
            })
            const response=recruiterEmps;
            if (!flag) {

                const newObject = { _id: seekerId }
                response = await Employee.findByIdAndUpdate({ _id: recId }, { $push: { arr: newObject } }, { new: true })
            }
            res.send(response);
            return;
        }
        else {
            const response = await Employee.create({
                _id: recId,
                arr: [{
                    _id: application.seekerId
                }]
            })

            res.send(response);
            return;
        }

    }
    res.send("Rejected");

}
)

module.exports = router