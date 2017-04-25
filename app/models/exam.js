let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let URL = require('mongoose-type-url');

//book schema definition
let ExamSchema = new Schema({
});

//Exports the examSchema for use elsewhere.
let Exam = mongoose.model('Exam', ExamSchema);
module.exports = { ExamSchema, Exam };