let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let { Exam, ExamSchema } = require('./Exam');

let GroupSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  exams: [ ExamSchema ]
});

module.exports = mongoose.model('Group', GroupSchema);