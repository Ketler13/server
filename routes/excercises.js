const mongoose = require('../libs/mongoose');
const Excercise = require('../models/excercise');
const pick = require('lodash/pick');

exports.param = async (id, ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  ctx.excerciseById = await Excercise.findById(id);

  if (!ctx.excerciseById) {
    ctx.throw(404);
  }

  await next();
};

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

exports.del = async (ctx) => {
  try {
    await ctx.excerciseById.remove();
    ctx.body = {success: true};
  } catch (e) {
    ctx.body = {success: false};
    console.log(e);
  }
}
