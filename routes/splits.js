const pick = require('lodash/pick');
const passport = require('passport');
const Split = require('../models/split');

exports.post = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false})(ctx, next);
  const {user} = ctx.request.body;
  if (!user) ctx.throw(401);
  const splits = await Split.find({user});
  ctx.body = splits.map(split => {
    const id = split._id;
    return Object.assign({}, pick(split, Split.publicFields), {id});
  });
};
