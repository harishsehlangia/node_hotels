const express = require('express');
const app = express();
const db = require('./db');

const dotenv = require("dotenv");
dotenv.config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Welcome to our Hotel')
});


// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the Router
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});