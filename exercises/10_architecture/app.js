const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('./models/Event');
const User = require('./models/User');


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(`Error connecting to MongoDB`, error);
});

const app = express();

//Use EJS templating library
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Serve static files automatically (in this case, CSS)
app.use(express.static(path.join(__dirname, 'public')));

//Set up body-parser. This will accept POST data and append them to the req object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //this will also accept JSON from the tests


// Use routes
app.use('/', userRoutes);
app.use('/', eventRoutes);

// Redirect root to events
app.get('/', (req, res) => res.redirect('/events'));

module.exports = app;