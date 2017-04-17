const mongoose = require('../libs/mongoose');
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

exports.patch = async (ctx) => {
  try {
    Object.assign(ctx.splitById, {mark: String(ctx.request.body.rate)});
    await ctx.splitById.save();
    ctx.body = {success: true};
  } catch (e) {
    ctx.throw(409);
  }

};

exports.del = async (ctx) => {
  try {
    await ctx.splitById.remove();
    ctx.body = {success: true};
  } catch (e) {
    ctx.body = {success: false};
    console.log(e);
  }
};
