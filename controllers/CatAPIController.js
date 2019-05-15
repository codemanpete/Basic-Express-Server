const Cat = require('../models/Cat.model');

const CatAPIController = {
    // controller for get by id
    CatDetail: function(req, res) {
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
    },

    // controller for index
    CatIndex: function(req, res) {
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
    },

    // controller for create new cat
    CatCreate: function(req, res) {
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
    },

    // controller for update cat by id
    CatUpdate: function(req, res){
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
    },

    // controller for delete cat
    CatDelete: function(req, res) {
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
    }
};


module.exports = CatAPIController;