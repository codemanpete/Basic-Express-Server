// server.js

// basic setup for express app
const express = require('express');
const app = express();

// morgan is an http request logger middleware
const morgan = require('morgan');
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // [combined] outputs apache style logs
}

// [express.static] is a built in middleware function that 
// specifies root directory to serve static assets.
// [use] is used to apply middleware to the app
app.use(express.static('public'));

// sets the default engine extension for views to ejs.
// ejs - embedded javascript
app.set('view engine', 'ejs');

// mongoose - package to connect to MongoDB
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise; // legacy code used prior to mongoose 5
if (process.env.NODE_ENV === 'test')
    mongoose.connect('mongodb://localhost/catsdemotest');
else
    mongoose.connect('mongodb://localhost/catsdemo');

// body-parser extract the entire body portion of an incoming
// request stream and exposes it on req.body.
// as of express 4.16.0 you can use app.use(express.json()) instead
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const CatRouter = require('./routes/CatRouter');
// sets up routing to paths with prefix /cats and lets
// CatRouter handle them.
app.use('/cats', CatRouter);

// path - javascript class that joins strings into a path
const path = require('path');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

const CatAPIRouter = require('./routes/CatAPIRouter');
app.use('/api/cats', CatAPIRouter);

let port = 3000;
if (process.env.NODE_ENV === 'test')
    port = 3001;
app.listen(port, function(){
    console.log('99 Cats express api');
});

module.exports = app;