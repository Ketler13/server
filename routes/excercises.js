const Excercise = require('../models/excercise');
const pick = require('lodash/pick');

exports.get = async (ctx) => {
  const excercises = await Excercise.find({});
  if (excercises && excercises.length) {
    const mappedExcercises = excercises.map(excercise => {
      const id = excercise._id;
      return Object.assign({}, pick(excercise, Excercise.publicFields), {id});
    });
    ctx.body = {
      success: true,
      excercises: mappedExcercises
    };
  } else {
    ctx.body = {success: false};
  }
}
