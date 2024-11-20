const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

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
