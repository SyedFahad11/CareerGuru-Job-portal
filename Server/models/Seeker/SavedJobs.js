const mongoose = require("mongoose")
const { Schema } = mongoose;

const SavedJobs = new Schema({
    _id: {
        type: String,

    },
    arr: [{
        job_id: {
            type: String,
            unique: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
});
const savedJobs = mongoose.model('savedJobs', SavedJobs);

module.exports = savedJobs;