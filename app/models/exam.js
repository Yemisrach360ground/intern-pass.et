let mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('mongoose-type-url');

//book schema definition
let ExamSchema = new Schema({

  id: {
            type: 'number',
            required: true
        },
  title:{
            type: 'string',
            required:true
 },
  questions_count:{
          type: 'number',
          required:true
 },
  duration:{
          type: 'number',
          required:true
 },
  icon: [{type: mongoose.SchemaTypes.Url}],
  instructions:{
          type:[String],
          required:true
  },
  difficulty:{
        type:'number',
        required:true
  }
});

//Exports the examSchema for use elsewhere.
let Exam = mongoose.model('Exam', ExamSchema);
module.exports = { ExamSchema, Exam };
