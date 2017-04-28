//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Exam = require('../app/models/exam').Exam;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

 /*
  * Test the /POST route====
  */
  describe('/POST exam', () => {
	  it('it should not POST a exam without pages field', (done) => {
	  	let exam = {
            title: "Question Title",
            questions_count: 3,
            duration: 60,
            icon: "www.google.com",
            instruction: [
                "the instruction for the question goes here",
                "the instruction for the question goes here"
            ]
           //difficulty:3
        }

			chai.request(server)
		    .post('/exam')
		    .send(exam)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('difficulty');
          res.body.errors.difficulty.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a exam ', (done) => {
	  	let exam = {

            title:"Title of the exam",
            questions_count: 20,
            duration: 20,
            icon: "http://www.google.co.uk",
            instruction: ["instruction1", "instruction2"
],
            difficulty:2
        };
			chai.request(server)
		    .post('/exam')
		    .send(exam)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Exam successfully added!');
			  	res.body.exam.should.have.property('title');
			  	res.body.exam.should.have.property('questions_count');
			  	res.body.exam.should.have.property('duration');
			  	res.body.exam.should.have.property('icon');
          		res.body.exam.should.have.property('instructions');
			  	res.body.exam.should.have.property('difficulty');
          		res.body.exam.should.have.property('_id');
		      done();
		    });
	  });
  });
