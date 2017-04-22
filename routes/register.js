const User = require('../models/user');

exports.post = async (ctx) => {
  const {email, displayName, password} = ctx.request.body;
  if (!email || !displayName || !password) {
    ctx.throw(400);
  }
  const emailExists = await User.findOne({email});
  const displayNameExists = await User.findOne({displayName});
  if (emailExists) {
    ctx.body = {
      success: false,
      message: 'Email exists'
    };
  } else if (displayNameExists) {
    ctx.body = {
      success: false,
      message: 'Name exists'
    };
  } else {
    const user = await User.create({email, displayName, password});
    if (user) {
      ctx.body = {
        success: true
      };
    } else {
      ctx.throw(500);
    }
  }
};
