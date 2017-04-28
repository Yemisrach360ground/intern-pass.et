let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let QuestionSchema = new Schema({

  id: {
            type: 'number',
            required: true
        },
  correct_option_indices: {
            type: [Number],
            required: true
          },
  has_image:{
            type: 'boolean',
            required:true
 },
  audible:{
          type: 'boolean',
          required:true
 },
  explanation:{
          type: 'string',
          required:'true'
 },
  options:{
          type: [String],
          required: 'true'
  },
  estimatedTime:{
          type:'number',
          required:'true'
  },
  text:{
    type:'string',
    required:'true'
  }
});

let Question = mongoose.model('Question', QuestionSchema);
module.exports = mongoose.model('Question', QuestionSchema);
