process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Cat = require('../models/Cat.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Cats', function() {
    // Clean up testing database before each test
    beforeEach( function (done) {
        Cat.deleteMany({}, function(err) {
            done();
        });
    });

    // Test for index route
    describe('/GET cats', function() {
        it('it should GET all the cats', function (done) {
            chai.request(server)
                .get('/api/cats')
                .end( function (err, res) {
                    res.should.have.status(200);
                    res.body.cats.should.be.a('array');
                    done(); // important for where done is located.
                });
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
                    done();
                });
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
                    res.body.cat.should.be.a('object');
                    res.body.cat.should.have.property('name').eql('good cat');
                    done();
                });
        });
    });

    // Test for GET route
    describe('/GET/:id cats', function() {
        it('it should GET a cat', function (done) {
            let exampleCat = new Cat({
                name: 'example cat',
                age: 12
            });
            exampleCat.save( function (err, cat) {
                chai.request(server)
                    .get('/api/cats/' + cat.id)
                    .end( function (_err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql('true');
                        res.body.cat.should.be.a('object');
                        res.body.cat.should.have.property('name')
                            .eql('example cat');
                        done();
                    });
                });
        });
    });

    describe('/POST/:id cats', function() {
        // Test for update route
        it('it should UPDATE a cat given params and id', function (done) {
            let exampleCat2 = new Cat({
                name: 'example cat 2',
                age: 15
            });
            let updateParams = {
                name: 'improved cat',
                age: 16
            };
            exampleCat2.save( function (err, cat) {
                chai.request(server)
                    .post('/api/cats/update/' + cat.id)
                    .send(updateParams)
                    .end( function (_err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql('true');
                        res.body.cat.should.be.a('object');
                        res.body.cat.should.have.property('name')
                            .eql('improved cat');
                        res.body.cat.should.have.property('age').eql(16);
                        done();
                    });
            });
        });

        // Test for update route with invalid cat id
        it('it should return error when given invalid id', function (done) {
            let updateParams = {
                name: 'impossible cat',
                age: 9999
            };
            chai.request(server)
                .post('/api/cats/update/invalidcatid123132')
                .send(updateParams)
                .end( function (err, res) {
                    res.should.have.status(404);
                    res.body.should.have.property('error');
                    done();
                });
        });
    });

    // Test for DELETE route
    describe('/DELETE/:id cats', function () {
        it('it should DELETE a cat given id', function (done){
            let doomedCat = new Cat({
                name: "trash cat",
                age: 10
            });
            doomedCat.save(function (err, cat) {
                chai.request(server)
                    .get('/api/cats/delete/' + cat.id)
                    .end( function (_err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('success').eql('true');
                        res.body.cat.should.have.property('name')
                            .eql('trash cat');
                        done();
                    });
            });
        });

        it('it should return error when given invalid id', function (done) {
            chai.request(server)
                .get('/api/cats/delete/invalidcatid1200049')
                .end( function (err, res) {
                    res.should.have.status(404);
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});