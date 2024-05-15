const mongoose = require("mongoose")
const { Schema } = mongoose;

const Emp = new Schema({
    _id: {
        type: String,

    },
    arr: [{
        _id: {
            type: String
        },
        joinDate: {
            type: Date,
            default: Date.now
        },
        end:{
            type:String
        }
    }]
});
const savedJobs = mongoose.model('employee', Emp);

module.exports = savedJobs;