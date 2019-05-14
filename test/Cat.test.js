process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Cat = require('../models/Cat.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Cats', function() {
    // Test for index route
    describe('/GET cats', function() {
        it('it should GET all the cats', function (done) {
            chai.request(server)
                .get('/api/cats')
                .end( function (err, res) {
                    res.should.have.status(200);
                    res.body.cats.should.be.a('array');
                });
                done();
        });
    });
});