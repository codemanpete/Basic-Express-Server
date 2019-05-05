// server.js

const express = require('express');
const CoinRouter = require('./routes/CoinRouter');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/coins', CoinRouter);

const port = 3000;
app.listen(port, function(){
    console.log('99 Cats express api');
});