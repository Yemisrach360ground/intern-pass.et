let Exam = require('../app/models/Exam');
let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

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