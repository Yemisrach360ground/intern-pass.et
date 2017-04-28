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
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id exam', () => {
	  it('it should DELETE a exam given the id', (done) => {
	  	let exam = new Exam({
        title: "Question Title",
        questions_count: 3,
        duration: 60,
        icon: "http://www.google.com",
        instruction: [
            "the instruction for the question goes here",
            "the instruction for the question goes here"
        ],
        difficulty:3
      })
	  	exam.save((err, exam) => {
				chai.request(server)
			    .delete('/exam/' + exam.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Exam successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
