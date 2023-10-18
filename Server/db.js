const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: 'mongo.env' });
const url = process.env.MONGOURL;

function connectToMongo() {
    mongoose.connect('mongodb+srv://rohan272525:gAyhlq9X9zdmnEQZ@cluster0.py4fk1w.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}

module.exports = connectToMongo;
