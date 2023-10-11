const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    job:{
        type: String
    },
    skills:{
        type: String
    },
    pay:{
        type: String

    },
    qualification:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;