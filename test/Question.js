let Question = require('../app/models/Question');

describe('Question Model', () => {
  it('should be invalid if id is empty', (done) => {
      let q = new Question({
        text: 'Question Text',
        correct_option_indices: [1, 2, 3],
        has_image: true,
        audible: true,
        explanation: "Explanation",
        options: ['a', 'b', 'c'],
        estimatedTime: 20
      });
      q.validate((err) => {
        err.errors.id.should.exist;
        done();
      })
  });

  it('should be invalid if text is not defined', (done) => {
    let q = new Question({
        id: 1,
        correct_option_indices: [1, 2, 3],
        has_image: true,
        audible: true,
        explanation: "Explanation",
        options: ['a', 'b', 'c'],
        estimatedTime: 20
      });
      q.validate((err) => {
        err.errors.text.should.exist;
        done();
      })
  });

  it('should be invalid if correct_option_indices is not defined', (done) => {
    let q = new Question({
        id: 1,
        text: 'Text',
        has_image: true,
        audible: true,
        explanation: "Explanation",
        options: ['a', 'b', 'c'],
        estimatedTime: 20
      });
      q.validate((err) => {
        err.errors.correct_option_indices.should.exist;
        done();
      })
  });

  it('should be invalid if correct_option_indices is empty array', (done) => {
    let q = new Question({
        id: 1,
        text: 'Text',
        correct_option_indices: [],
        has_image: true,
        audible: true,
        explanation: "Explanation",
        options: ['a', 'b', 'c'],
        estimatedTime: 20
      });
      // hint: use the validate block inside your Schema definition
      q.validate((err) => {
        err.errors.correct_option_indices.should.exist;
        // err.errors.correct_option_indices.message.should.equal("There must be at least one correct option index");
        done();
      })
  });

  it('should be invalid if options is not an array', (done) => {
    let q = new Question({
        id: 1,
        text: 'Text',
        correct_option_indices: [1,2,3],
        has_image: true,
        audible: "string",
        explanation: "Explanation",
        options: [],
        estimatedTime: 20
      });
      // hint: use the validate block inside your Schema definition
      q.validate((err) => {
        err.errors.options.should.exist;
        done();
      })
  });

  it('should be invalid if options is an empty array', (done) => {
    let q = new Question({
        id: 1,
        text: 'Text',
        correct_option_indices: [1,2,3],
        has_image: true,
        audible: "string",
        explanation: "Explanation",
        options: [],
        estimatedTime: 20
      });
      // hint: use the validate block inside your Schema definition
      q.validate((err) => {
        err.errors.options.should.exist;
        // err.errors.options.message.should.equal('There must be at least one option');
        done();
      })
  });
})
