const mongoose = require('../libs/mongoose');
const Split = require('../libs/split');
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
  Object.assign(ctx.splitById, pick(ctx.request.body, Split.publicFields));
  await ctx.splitById.save();
  ctx.body = ctx.splitById.toObject();
};

exports.del = async (ctx) => {
  await ctx.splitById.remove();
  ctx.body = 'ok';
}
