//Dependencies
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const path = require("path");
const passport = require('passport');
const Sequelize = require('sequelize');
const port = process.env.port || 4000;

const app = express();

// Passport
const passportConfig = require('./server/config/passport');
app.use(passport.initialize()); 

//Setting up json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cross-Origin Resource Sharing
app.use(cors());

//App uses routes versions
  //Route
const v1 = require("./server/routes/v1");
const v2 = require("./server/routes/v2");

app.use("/v1", v1);
app.use("/v2", v2 );

//Testing port...
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

// Uncaught
process.on('unhandledRejection', error => {
  console.log('Uncaught Error', error);
});