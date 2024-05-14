const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobsSchema = new Schema({
    recId:{
        type:String,
        required:true

    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required: true

    },
    category:{
        type: String,
        required: true

    },
    contractType:{
        type: String,
        required: true

    },
    companyName:{
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

