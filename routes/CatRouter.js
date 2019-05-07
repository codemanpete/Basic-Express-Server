const express = require('express');
const app = express();
const CatRouter = express.Router();
const Cat = require('../models/Cat.model');

CatRouter.route('/').get(function (req, res) {
    Cat.find(function (err, cats) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {cats: cats});
        }
    });
});

CatRouter.route('/create').get(function (req, res) {
    res.render('create');
});

CatRouter.route('/post').post(function (req, res) {
    const cat = new Cat(req.body);
    console.log(cat);
    cat.save()
        .then( cat => {
            res.redirect('/cats');
        })
        .catch( err => {
            res.status(400).send("unable to save to database");
        });
});
module.exports = CatRouter;