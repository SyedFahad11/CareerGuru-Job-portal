const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecruiterSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
const Recruiter = mongoose.model('recruiter', RecruiterSchema);
module.exports = Recruiter;