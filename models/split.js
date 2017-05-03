const mongoose = require('../libs/mongoose');


const splitSchema = new mongoose.Schema({
  excercises: [{
    name: {
      type: String,
      required: 'Укажите название'
    },
    sets: [{type: String}]
  }],
  mark: {
    type: String,
    default: '0'
  },
  date: String,
  user: {
    type: String
  }
}, {
  timestamps: true
});

splitSchema.statics.publicFields = ['excercises', 'mark', 'date'];
// Split.publicFields
module.exports = mongoose.model('Split', splitSchema);
