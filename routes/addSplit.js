const Split = require('../models/split');
const passport = require('passport');

exports.post = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false})(ctx, next);
  const split = await Split.create(ctx.request.body);
  if (split) {
    ctx.body = {success: true};
  } else {
    ctx.body = {success: false};
  }
}
