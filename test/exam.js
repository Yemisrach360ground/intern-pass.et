let mongoose = require('mongoose');
let should = require('chai').should();
let { Exam } = require('../app/models/exam');

describe('Exam Model', () => {
  it('should be invalid if id is empty', (done) => {
      let e = new Exam({
        title: "Title of the exam",
        questions_count: 20,
        duration: 20,
        icon: "http://www.google.co.uk",
        instructions: ["instruction1", "instruction2"],
        difficulty: 2
      });
      e.validate((err) => {
        err.errors.id.should.exist;
        done();
      })
  });

  it('should be invalid if title is empty', (done) => {
      let e = new Exam({
        id: 4,
        questions_count: 20,
        duration: 20,
        icon: "http://www.google.co.uk",
        instructions: ["instruction1", "instruction2"],
        difficulty: 2
      });
      e.validate((err) => {
        err.errors.title.should.exist;
        done();
      })
  });
  it('should be invalid if questions_count is empty', (done) => {
     let e = new Exam({
        id: 4,
        title: "Title of the exam",
        duration: 20,
        icon: "http://www.google.co.uk",
        instructions: ["instruction1", "instruction2"],
        difficulty: 2
      });
      e.validate((err) => {
        err.errors.questions_count.should.exist;
        done();
      })
  });
  it('should be invalid if questions_count is not numeric', (done) => {
     let e = new Exam({
        id: 4,
        title: "Title of the exam",
        questions_count: "non-numeric questions count",
        duration: 20,
        icon: "http://www.google.co.uk",
        instructions: ["instruction1", "instruction2"],
        difficulty: 2
      });
      e.validate((err) => {
        err.errors.questions_count.should.exist;
        done();
      })
  });
  it('should be invalid if icon is not URL', (done) => {
     let e = new Exam({
        id: 4,
        title: "Title of the exam",
        duration: 20,
        icon: "a non url string",
        instructions: ["instruction1", "instruction2"],
        difficulty: 2
      });
      e.validate((err) => {
        err.errors.icon.should.exist;
        done();
      })
  });
  it('should be invalid if instructions is not of Array type', (done) => {
      let e = new Exam({
        id: 4,
        title: "Title of the exam",
        duration: 20,
        icon: "a non url string",
        instructions: "A non-array data",
        difficulty: 2
      });
      e.validate((err) => {
        err.errors.instructions.should.exist;
        done();
      })
  });
  it('should be invalid if difficulty is not numeric', (done) => {
      let e = new Exam({
        id: 4,
        title: "Title of the exam",
        duration: 20,
        icon: "a non url string",
        instructions: ["instruction1", "instruction2"],
        difficulty: "non-numeric difficulty"
      });
      e.validate((err) => {
        err.errors.difficulty.should.exist;
        done();
      })
  });
})
