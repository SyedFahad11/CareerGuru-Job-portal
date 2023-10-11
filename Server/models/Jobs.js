const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
        
    },
    postedBy:{
        type: String,
        required: true
    },
    workingHours:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true

    },
    contact:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const Jobs = mongoose.model('jobs', JobsSchema);
  module.exports = Jobs;