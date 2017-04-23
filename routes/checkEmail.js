const User = require('../models/user')

exports.post = async (ctx) => {
  const {email} = ctx.request.body;
  if (!email) {
    ctx.throw(400)
  } else {
    try {
      const user = await User.findOne({email});
      if (!user) {
        ctx.body = {success: true};
      } else {
        ctx.body = {success: false, error: 'Email exists'};
      }
    } catch (error) {
      ctx.throw(error);
    }
  }
}
