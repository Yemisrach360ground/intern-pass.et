let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let URL = require('mongoose-type-url');


//book schema definition
let ExamSchema = new Schema({
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
  icon:{
          type:mongoose.SchemaTypes.Url,
          required: true
  },
  instructions:{
          type:'Array',
          validate: {
          validator: (value)=> {
            return Array.every((value)=> typeof value === 'string');
          }
  }},


  difficulty:{
        type:'number',
        required:true
  }
});

//Exports the examSchema for use elsewhere.
let Exam = mongoose.model('Exam', ExamSchema);
module.exports = { ExamSchema, Exam };
