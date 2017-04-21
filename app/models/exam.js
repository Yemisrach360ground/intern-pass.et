let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let examSchema = new Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    options: [Schema.Types.Mixed],
    answer: { type: String, required: true},
    level: { type: Number, required: true },  
    subject: { type: String, required: true}, 
    duration: { type: Number, required: true }, 
    icon:{type:String, required: true},
    instruction: [String], 
    explanation: { type: String, required: true },   
    trial: { type: Number, required: true }, 
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
examSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the examSchema for use elsewhere.
module.exports = mongoose.model('exam', examSchema);
