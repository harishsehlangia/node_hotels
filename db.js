const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

// Setup MongoDB Connection
mongoose.connect(mongoURL);


// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', ()=> {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err)=> {
    console.log('MongoDB connection error: ', err);
});

db.on('disconnected', ()=> {
    console.log('MongoDB disconnected');
});

// Export the Database Connection
module.exports = db;
