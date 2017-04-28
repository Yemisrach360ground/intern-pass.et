//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Exam = require('../app/models/exam');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var jwt = require('jsonwebtoken'); //used to create, sign, and verify tokens

chai.use(chaiHttp);


//Our parent block
describe('Auth', () => {
	beforeEach((done) => { //Before each test we empty the database
		Exam.remove({}, (err) => {
		   done();
		});
    /*
     * Test the /GET route
     */
     describe('/GET exam with out token', () => {
   	  it('it should not pass with out the aut token', (done) => {
   			chai.request(server)
   		    .get('/users')
   		    .end((err, res) => {
   			  	res.should.have.status(403);
   			  	// res.body.should.be.a('array');
   			  	// res.body.length.should.be.eql(0);
   		      done();
   		    });
   	  });
     });
    
	});
});
