let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//let validate = require('mongoose-validator');

let QuestionSchema = new Schema({
     _id: { type: Schema.Types.ObjectId, required: true },
     correct_option_indices: {type: [Number], required: true },
     has_image: { type: Boolean, required: true },
     audible: { type: Boolean, required: true },
     explanation: { type: String, required: true },
     options:{ type: [String], required: true},
     text: { type: String, required: true },
     extimatedTime: { type: Number, required: true },

    
},
{ 
    versionKey: false
  }

);

// if(!Array.isArray(QuestionSchema.options)){
//     throw new Error("options is not an array");
// }

module.exports = mongoose.model('Question', QuestionSchema);