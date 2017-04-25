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
    validate: {
      validator: (v) => {
        return v.length > 0;
      },
      message: 'There must be at least one correct option index'
    },
    required: [true, 'Correct option indices required'],
  },
  has_image: Boolean,
  audible: Boolean,
  explanation: String,
  options: {
    type: [String],
    validate: {
      validator: (v) => {
        return v.length > 0;
      },
      message: 'There must be at least one option'
    }
  },
  estimatedTime: Number
});

module.exports = mongoose.model('Question', QuestionSchema);