const express = require('express');
const CatRouter = express.Router();
const Cat = require('../models/Cat.model');

// [req] - request
// [res] - result

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

CatRouter.route('/').post(function (req, res) {
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

CatRouter.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Cat.findById(id, function (err, cat) {
        res.render('edit', {cat: cat});
    });
});

CatRouter.route('/update/:id').post(function (req, res) {
    Cat.findById(req.params.id, function(err, cat) {
        if (!cat)
            return next(new Error('Could not load Document'));
        else {
            cat.name = req.body.name;
            cat.age = req.body.age;

            cat.save().then(cat => {
                res.redirect('/cats');
            })
            .catch(err => {
                res.status(400).send("unable to update the database.");
            });
        }
    });
});

CatRouter.route('/delete/:id').get(function (req, res) {
    Cat.findByIdAndRemove({_id: req.params.id}, function(err, cat) {
        if (err) res.json(err);
        else res.redirect('/cats');
    });
});

module.exports = CatRouter;