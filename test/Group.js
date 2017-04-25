let should = require('chai').should();
let Group = require('../app/models/Group');

describe('Group Model', () => {
  it('should be invalid if id is empty', (done) => {
    let g = new Group();
    g.name = "Name of the group";
    g.validate((err) => {
      err.errors.id.should.exist;
      done();
    });
  });

  it('should be invalid if name is empty', (done) => {
    let g = new Group();
    g.id = 1;
    g.validate((err) => {
      err.errors.name.should.exist;
      done();
    })
  });
})