const mongoose = require('../libs/mongoose');


const excerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: 'Excercise already exists',
    required: 'Enter title'
  },
  text: {
    type: String,
    required: 'Enter text'
  }
}, {
  timestamps: true
});

excerciseSchema.statics.publicFields = ['title', 'text'];
module.exports = mongoose.model('Excercise', excerciseSchema);
