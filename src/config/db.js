const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect( "mongodb://mobassera:password@localhost:27017");
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("MongoDB connection failed: ", error);
        process.exit(1);

    }
}

module.exports = connectDB;