let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let { Exam, ExamSchema } = require('./exam');

let GroupSchema = new Schema({

  name:{
      type: 'string',
      required:true
  },
  id:{
          type: 'number',
          required: true
      }
});

module.exports = mongoose.model('Group', GroupSchema);
