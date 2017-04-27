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
	});
});
