let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let { Exam, ExamSchema } = require('./Exam');

let GroupSchema = new Schema({});

module.exports = mongoose.model('Group', GroupSchema);