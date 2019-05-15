const express = require('express');
const CatAPIRouter = express.Router();
const Cat = require('../models/Cat.model');

// queries for a cat given its id
CatAPIRouter.route('/:id').get(function(req, res) {
    Cat.findById(req.params.id, function(err, cat){
        if (!cat) {
            res.status(404).send({
                success: 'false',
                error: err
            });
        }
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
        if (err) {
            res.status(500).send({
                success: 'false',
                error: err
            });
        }
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
    cat.save().then( cat => {
        res.status(200).send({
            success: 'true',
            method: 'POST',
            cat: cat
        });
    }).catch( err => {
        res.status(400).send({
            success: 'false',
            error: err
        });
    });
});

// api - update cat by :id
CatAPIRouter.route('/update/:id').post(function(req, res){
    Cat.findById(req.params.id, function(err, cat) {
        if(!cat) {
            res.status(404).send({
                success: 'false',
                error: err
            });
        }
        else {
            cat.name = req.body.name;
            cat.age = req.body.age;
            cat.save().then(cat => {
                res.status(200).send({
                    success: 'true',
                    method: 'POST',
                    cat: cat
                });
            }).catch( err => {
                res.status(400).send({
                    success: 'false',
                    error: err
                });
            });
        }
    });
});

// api - delete cat by :id
CatAPIRouter.route('/delete/:id').get(function(req, res) {
    Cat.findByIdAndRemove({_id: req.params.id}, function(err, cat) {
        if(err) 
            res.status(404).send({
                success: 'false',
                error: err
            });
        else 
            res.status(200).send({
                success: 'true',
                method: 'DELETE',
                cat: cat
            });
    });
});

module.exports = CatAPIRouter;