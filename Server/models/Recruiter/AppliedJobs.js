const mongoose = require("mongoose")
const { Schema } = mongoose;

const AppliedJobs = new Schema({
    _id: {
        type: String,

    },
    jobArr: [{

            jobId: {
                type:String
            },
            appliArr:[
                    {
                        _id: {
                            type: String,
                            unique: true
                        },
                        date: {
                            type: Date,
                            default: Date.now
                        },
                    }
                ]
    }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});
const recJobsStats = mongoose.model('recJobsStats', AppliedJobs);

module.exports = recJobsStats ;