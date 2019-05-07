// server.js

const express = require('express');
const CatRouter = require('./routes/CatRouter');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/catsdemo')

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/cats', CatRouter);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

const port = 3000;
app.listen(port, function(){
    console.log('99 Cats express api');
});