let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let QuestionSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  correct_option_indices: {
    type: [Number],
    required: true
  },
  has_image: Boolean,
  audible: Boolean,
  explanation: String,
  options: [String],
  estimatedTime: Number
});

module.exports = mongoose.model('Question', QuestionSchema);