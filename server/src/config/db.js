const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect( "mongodb://mongodb:27017/mydatabase");
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("MongoDB connection failed: ", error);
        process.exit(1);

    }
}

module.exports = connectDB;