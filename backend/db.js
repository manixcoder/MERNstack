const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');
const mongoURI ="mongodb://localhost:27017/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo successfully");
    } catch (error) {
        console.log("Error connecting to Mongo:", error);
    }
};

module.exports = connectToMongo;