const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const db = require('./database');
const mongoose = require('mongoose');
const mongodb = require('./mondodb');
const loginrt = require('../src/routes/loginroutes');
const apirt = require('../src/routes/api');
const profilert = require('../src/routes/StuProfessProfilert');
const session = require('express-session');


const app = express();


app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static('./uploads'));


app.use('/',loginrt);
app.use('/Mongo',apirt);
app.use('/profilert',profilert);



module.exports = app;

