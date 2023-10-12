const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:'mongo.env'});
const url=process.env.MONGOURL;

function connectToMongo() {
    mongoose.set("strictQuery", true);
    // mongoose.connect(url,
    //     {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useCreateIndex: true,
    //         useFindAndModify: false
    //     }
    // );
    mongoose.connect('mongodb://127.0.0.1:27017/CG',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    ); 

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}

module.exports = connectToMongo;
