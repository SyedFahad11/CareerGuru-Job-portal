const mongoose = require("mongoose")
const { Schema } = mongoose;

const Emp = new Schema({
    _id: {
        type: String,

    },
    arr: [{
        _id: {
            type: String,
            unique:true
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

Emp.index({ '_id': 1, 'arr._id': 1 }, { unique: true });
//compound Index
const savedJobs = mongoose.model('employee', Emp);

module.exports = savedJobs;