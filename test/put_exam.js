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
  * Test the /PUT/:id route
  */
  describe('/PUT/:id exam', () => {
	  it('it should UPDATE a exam given the id', (done) => {
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
			    .put('/exam/' + exam.id)
			    .send({
            title: "Question Title",
            questions_count: 3,
            duration: 60,
            icon: "http://www.google.com",
            instruction: [
                "the instruction for the question goes here",
                "the instruction for the question goes here"
            ],
            difficulty:0
        })
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Exam updated!');

			      done();
			    });
		  });
	  });
  });



describe('/GET/ with out auth', () => {
	  it('it should not be accessed with invalid auth token', (done) => {
    			chai.request(server)
			    .get('/users/')
			    .end((err, res) => {
				  	res.should.have.status(403);
				  	res.body.should.be.a('object');
				  	// res.body.should.have.property('message').eql('Exam updated!');

			      done();
			    });
		  });
	  });
 

describe('/GET and /post/ it should access with valid auth token', () => {
    it('it should list user without auth', (done) => {  
        chai.request(server)
        .post('/setup/')
        .send({
            name: 'randome user',
            password: 'password',
            admin: true
        })
        .end((err, res) => {
            chai.request(server)
            .post('/authenticate')
            .send({
                name: res.name,
                password: res.password
            })
            .end((err, res) => {
                let token = res.token;
                chai.request(server)
                .get('/users?token=' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql('Exam updated!');

                    done();
                });
            })
        })
    });
});

describe('/GET and /post/ it should access with valid auth token', () => {
it('it should fail if token is invalid', (done) => {  
        token = "users?token=1";
        chai.request(server)
        .get('/users?token=' + token)
        .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            // res.body.should.have.property('message').eql('Exam updated!');
            done();
        });
    });
});