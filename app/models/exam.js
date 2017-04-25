let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let URL = require('mongoose-type-url');

//book schema definition
let ExamSchema = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    title: { 
      type: String, 
      required: true
    },
    questions_count: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    icon: URL,
    instructions: [ String ],
    difficulty: {
      type: Number,
      required: true
    }
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ExamSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the examSchema for use elsewhere.
let Exam = mongoose.model('Exam', ExamSchema);
module.exports = { ExamSchema, Exam };