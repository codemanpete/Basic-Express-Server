const Cat = require('../models/Cat.model');

const CatController = {
    // controller for get by id (not implemented)

    // controller for index
    CatIndex: function (req, res) {
        Cat.find(function (err, cats) {
            if(err){
                console.log(err);
            } else {
                res.render('index', {cats: cats});
            }
        });
    },

    // controller for create new cat
    CatPost: function (req, res) {
        const cat = new Cat(req.body);
        cat.save()
            .then( cat => {
                res.redirect('/cats');
            })
            .catch( err => {
                res.status(400).send("unable to save to database");
            });
    },

    // controller for update cat by id
    CatUpdate: function (req, res) {
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
    },

    // controller for delete cat
    CatDelete: function (req, res) {
        Cat.findByIdAndRemove({_id: req.params.id}, function(err, cat) {
            if (err) res.json(err);
            else res.redirect('/cats');
        });
    }
};


module.exports = CatController;