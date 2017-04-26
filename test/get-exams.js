let Exam = require('../app/models/exam');
let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

//Our parent block
describe('Exams', () => {
	beforeEach((done) => { //Before each test we empty the database
		Exam.remove({}, (err) => {
		   done();
		});

    describe('GET /exams/', () => {
      it('should get all exams', (done) => {
        chai.request(server)
        .get('/exam')
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
      });
    });
	});
});
