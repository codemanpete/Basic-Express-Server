const express = require('express');
const CatAPIRouter = express.Router();
const Cat = require('../models/Cat.model');

CatAPIRouter.route('/:id').get(function(req, res) {
    Cat.findById(req.params.id, function(err, cat){
        if (!cat)
            console.log(err);
        else
            res.status(200).send({
                success: 'true',
                message: 'cat queried successfully',
                cat: cat
            });
    });
});

CatAPIRouter.route('/').get(function(req, res) {
    Cat.find(function(err, cats) {
        if (err)
            console.log(err);
        else
            res.status(200).send({
                success: 'true',
                message: 'catlist queried successfully',
                cats: cats
            });
    });
});

module.exports = CatAPIRouter;