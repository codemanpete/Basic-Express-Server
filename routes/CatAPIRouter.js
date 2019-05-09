const express = require('express');
const CatAPIRouter = express.Router();
const Cat = require('../models/Cat.model');

// queries for a cat given its id
CatAPIRouter.route('/:id').get(function(req, res) {
    Cat.findById(req.params.id, function(err, cat){
        if (!cat)
            console.log(err);
        else
            res.status(200).send({
                success: 'true',
                method: 'GET',
                cat: cat
            });
    });
});

// queries for the entire index (all cats)
CatAPIRouter.route('/').get(function(req, res) {
    Cat.find(function(err, cats) {
        if (err)
            console.log(err);
        else
            res.status(200).send({
                success: 'true',
                method: 'GET',
                cats: cats
            });
    });
});

// api creates a new cat with params in req.body.
CatAPIRouter.route('/').post(function(req, res) {
    const cat = new Cat(req.body);
    console.log(cat);
    cat.save().then( cat => {
        res.status(200).send({
            success: 'true',
            method: 'POST',
            cat: cat
        });
    }).catch( err => {
        res.status(500).send({
            success: 'false',
            error: err
        });
    });
});

module.exports = CatAPIRouter;