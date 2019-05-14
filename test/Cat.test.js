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

    describe('/POST cats', function() {
        // Test for (invalid) post route
        it('it should not POST cat without name', function (done) {
            let badCat = {
                age: 99
            };
            chai.request(server)
                .post('/api/cats')
                .send(badCat)
                .end( function (err, res) {
                    res.should.not.have.status(200);
                    res.body.should.have.property('error');
                    res.body.should.be.a('object');
                });
            done();
        });
        // Test for post route
        it('it should POST a cat', function (done) {
            let goodCat = {
                name: 'good cat',
                age: 21
            };
            chai.request(server)
                .post('/api/cats')
                .send(goodCat)
                .end( function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql('true');
                    console.log(err);
                    console.log(res.body);
                });
            done();
        });
    })

});