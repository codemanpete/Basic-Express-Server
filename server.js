// server.js

// basic setup for express app
const express = require('express');
const app = express();

// [express.static] is a built in middleware function that 
// specifies root directory to serve static assets.
// [use] is used to apply middleware to the app
app.use(express.static('public'));

// sets the default engine extension for views to ejs.
// ejs - embedded javascript
app.set('view engine', 'ejs');

// mongoose - package to connect to MongoDB
const mongoose = require('mongoose');
// legacy code used prior to mongoose 5
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/catsdemo');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const CatRouter = require('./routes/CatRouter');
app.use('/cats', CatRouter);

const path = require('path');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

const port = 3000;
app.listen(port, function(){
    console.log('99 Cats express api');
});