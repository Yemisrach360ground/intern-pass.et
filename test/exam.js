//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Exam = require('../app/models/exam');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Exams', () => {
	beforeEach((done) => { //Before each test we empty the database
		Exam.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET exam', () => {
	  it('it should GET all the exams', (done) => {
			chai.request(server)
		    .get('/exam')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST exam', () => {
	  it('it should not POST a exam without pages field', (done) => {
	  	let exam = { 
            title: "Question Title 2", 
            question: "the question goes here", 
            options: [
                {
                    text:"option a element"
                },
                {
                    text:"option b element"
                }, 
                {
                    text:"option c element"
                },
                {
                    text:"option d element "
                }
            ],
            answer: "options.optionB", 
            level: 2, 
            subject: "the question subject goes here", 
            duration: 60 ,
            icon: "image2.png", 
            instruction: [
                "the instruction for the question goes here", 
                "the instruction for the question goes here"
            ],
            explanation:"the explanation 2 goes here"
        }
    
			chai.request(server)
		    .post('/exam')
		    .send(exam)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			    res.body.errors.should.have.property('trial');
			  	res.body.errors.trial.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a exam ', (done) => {
	  	let exam = {
            title:"Question Title 2", 
            question:"the question goes here", 
            options: [
                {
                    text:"option a element"
                },
                {
                    text:"option b element"
                }, 
                {
                    text:"option c element"
                },
                {
                    text:"option d element "
                }
            ],
            answer: "options.optionB", 
            level: 2, 
            subject: "the question subject goes here", 
            duration:60,
            icon: "image2.png", 
            instruction: [
                "the instruction for the question goes here", 
                "the instruction for the question goes here"
            ],
            explanation:"the explanation 2 goes here", 
            trial: 0 
        }
			chai.request(server)
		    .post('/exam')
		    .send(exam)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Exam successfully added!');

			  	res.body.Exam.should.have.property('title');
			  	res.body.Exam.should.have.property('question');
			  	res.body.Exam.should.have.property('options');
			  	res.body.Exam.should.have.property('answer');
                res.body.Exam.should.have.property('level');
			  	res.body.Exam.should.have.property('subject');
			  	res.body.Exam.should.have.property('duration');
                res.body.Exam.should.have.property('icon');
			  	res.body.Exam.should.have.property('instruction');
                res.body.Exam.should.have.property('explanation');
			  	res.body.Exam.should.have.property('trial');  
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id exam', () => {
	  it('it should GET a exam by the given id', (done) => {
	  	let exam = new Exam({
            title:"Question Title 2", 
            question:"the question goes here", 
            options: [
                {
                    text:"option a element"
                },
                {
                    text:"option b element"
                }, 
                {
                    text:"option c element"
                },
                {
                    text:"option d element "
                }
            ],
            answer: "options.optionB", 
            level: 2, 
            subject: "the question subject goes here", 
            duration:60,
            icon: "image2.png", 
            instruction: [
                "the instruction for the question goes here", 
                "the instruction for the question goes here"
            ],
            explanation:"the explanation 2 goes here", 
            trial: 0 
        });
	  	exam.save((err, exam) => {
	  		chai.request(server)
		    .get('/exam/' + exam.id)
		    .send(exam)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('question');
			  	res.body.should.have.property('options');
			  	res.body.should.have.property('answer');
                res.body.should.have.property('level');
			  	res.body.should.have.property('subject');
			  	res.body.should.have.property('duration');
			  	res.body.should.have.property('instruction');
                res.body.should.have.property('explanation');
			  	res.body.should.have.property('trial');  
			  	res.body.should.have.property('_id').eql(exam.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id exam', () => {
	  it('it should UPDATE a exam given the id', (done) => {
	  	let exam = new Exam({
            title:"Question Title 1", 
            question:"the question goes here", 
            options: [
                {
                    text:"option a element"
                },
                {
                    text:"option b element"
                }, 
                {
                    text:"option c element"
                },
                {
                    text:"option d element "
                }
            ],
            answer: "options.optionB", 
            level: 2, 
            subject: "the question subject goes here", 
            duration:60,
            icon: "image2.png", 
            instruction: [
                "the instruction for the question goes here", 
                "the instruction for the question goes here"
            ],
            explanation:"the explanation 2 goes here", 
            trial: 2
        })
	  	exam.save((err, exam) => {
				chai.request(server)
			    .put('/exam/' + exam.id)
			    .send({
            title:"Question Title 1", 
            question:"the question goes here", 
            options: [
                {
                    text:"option a element"
                },
                {
                    text:"option b element"
                }, 
                {
                    text:"option c element"
                },
                {
                    text:"option d element "
                }
            ],
            answer: "options.optionB", 
            level: 2, 
            subject: "the question subject goes here", 
            duration:60,
            icon: "image2.png", 
            instruction: [
                "the instruction for the question goes here", 
                "the instruction for the question goes here"
            ],
            explanation:"the explanation 2 goes here", 
            trial: 0 
        })
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Exam updated!');
				  	res.body.Exam.should.have.property('trial').eql(0);
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id exam', () => {
	  it('it should DELETE a exam given the id', (done) => {
	  	let exam = new Exam({
            title:"Question Title 1", 
            question:"the question goes here", 
            options: [
                {
                    text:"option a element"
                },
                {
                    text:"option b element"
                }, 
                {
                    text:"option c element"
                },
                {
                    text:"option d element "
                }
            ],
            answer: "options.optionB", 
            level: 2, 
            subject: "the question subject goes here", 
            duration:60,
            icon: "image2.png", 
            instruction: [
                "the instruction for the question goes here", 
                "the instruction for the question goes here"
            ],
            explanation:"the explanation 2 goes here", 
            trial: 0 
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
});