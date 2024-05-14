const mongoose = require("mongoose")
const { Schema } = mongoose;

const AppliedJobs = new Schema({
    _id: {
        type: String,

    },
    arr: [{
        _id: {
            type: String,
            unique: true
        },
    }],
    date: {
        type: Date,
        default: Date.now
    },
});
const recJobsStats = mongoose.model('recJobsStats', AppliedJobs);

module.exports = recJobsStats ;