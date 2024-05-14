const mongoose = require("mongoose")
const { Schema } = mongoose;

const AppliedJobs = new Schema({
  recId:{
    type:String
  },
  seekerId:{
    type:String
  },
  jobId:{
    type:String
  },
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
const application = mongoose.model('application', AppliedJobs);

module.exports = application;