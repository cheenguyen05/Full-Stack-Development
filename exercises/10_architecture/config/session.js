// config/session.js

const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
});

module.exports = sessionConfig;
