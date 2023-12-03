const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/chat-application" || process.env.MONGO_URI)
        console.log("Database is connected");
    }
    catch (error) {
        console.log("Database in not connected" , error.message);
    }
}

module.exports = connectDB;