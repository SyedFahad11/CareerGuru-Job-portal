const mongoose = require("mongoose")
const { Schema } = mongoose;

const AppliedJobs = new Schema({
  sop: {
    type: String,
  },
  status: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const recruiterAppliedJobs = mongoose.model('recruiterAppliedJobs', AppliedJobs);

module.exports = recruiterAppliedJobs;