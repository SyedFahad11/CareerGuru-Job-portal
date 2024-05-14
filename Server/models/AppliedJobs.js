const mongoose = require("mongoose")
const { Schema } = mongoose;

const AppliedJobs = new Schema({
    _id: {
        type: String,

    },
    arr: [{
        job_id: String,
    }],
    date: {
        type: Date,
        default: Date.now
    },
});
const appliedJobs = mongoose.model('appliedJobs', AppliedJobs);

module.exports = appliedJobs;