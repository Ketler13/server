const mongoose = require('../libs/mongoose');


const excerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: 'You must enter excercise name'
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

excerciseSchema.statics.publicFields = ['title', 'text'];
module.exports = mongoose.model('Excercise', excerciseSchema);
