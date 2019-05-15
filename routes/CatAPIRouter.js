const express = require('express');
const CatAPIRouter = express.Router();
const Cat = require('../models/Cat.model');
const CatController = require('../controllers/CatAPIController');

// queries for a cat given its id
CatAPIRouter.route('/:id').get(CatController.CatDetail);

// queries for the entire index (all cats)
CatAPIRouter.route('/').get(CatController.CatIndex);

// api creates a new cat with params in req.body.
CatAPIRouter.route('/').post(CatController.CatCreate);

// api - update cat by :id
CatAPIRouter.route('/update/:id').post(CatController.CatUpdate);

// api - delete cat by :id
CatAPIRouter.route('/delete/:id').get(CatController.CatDelete);

module.exports = CatAPIRouter;