const mongoose = require('../libs/mongoose');
const passport = require('passport');
const Split = require('../models/split');
const pick = require('lodash/pick');

exports.param = async (id, ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  ctx.splitById = await Split.findById(id);

  if (!ctx.splitById) {
    ctx.throw(404);
  }

  await next();
};

exports.patch = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false})(ctx, next);
  try {
    Object.assign(ctx.splitById, {mark: String(ctx.request.body.rate)});
    await ctx.splitById.save();
    ctx.body = {success: true};
  } catch (e) {
    ctx.throw(409);
  }

};

exports.del = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false})(ctx, next);
  try {
    await ctx.splitById.remove();
    ctx.body = {success: true};
  } catch (e) {
    ctx.body = {success: false};
    console.log(e);
  }
};
