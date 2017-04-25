let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let QuestionSchema = new Schema({});

module.exports = mongoose.model('Question', QuestionSchema);