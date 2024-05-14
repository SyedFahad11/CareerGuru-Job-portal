const mongoose = require("mongoose")
const { Schema } = mongoose;


const AppliedJobs = new Schema({
    _id: {
        type: String,

    },
    arr: [{
        application_id: {
            type: String,
            unique: true
        },
    }],
    date: {
        type: Date,
        default: Date.now
    },
});
const seekerAppliedJobs = mongoose.model('seekerAppliedJobs', AppliedJobs);

module.exports = seekerAppliedJobs;