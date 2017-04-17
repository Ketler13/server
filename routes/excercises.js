const Excercise = require('../models/excercise')

exports.get = async (ctx) => {
  const excercises = await Excercise.find({});
  if (excercises) {
    ctx.body = {
      success: true,
      excercises
    };
  } else {
    ctx.body = {success: false};
  }
}
