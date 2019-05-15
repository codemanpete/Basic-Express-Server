const express = require('express');
const CatRouter = express.Router();
const Cat = require('../models/Cat.model');
const CatController = require('../controllers/CatController');



CatRouter.route('/').get(CatController.CatIndex);

CatRouter.route('/create').get(function (req, res) {
    res.render('create');
});

CatRouter.route('/').post(CatController.CatPost);

CatRouter.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Cat.findById(id, function (err, cat) {
        res.render('edit', {cat: cat});
    });
});

CatRouter.route('/update/:id').post(CatController.CatUpdate);

CatRouter.route('/delete/:id').get(CatController.CatDelete);

module.exports = CatRouter;