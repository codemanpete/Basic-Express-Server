const express = require('express');
const app = express();
const CoinRouter = express.Router();

CoinRouter.route('/').get(function (req, res) {
    res.render('index');
});

module.exports = CoinRouter;