const User = require('../models/user')

exports.post = async (ctx) => {
  const {name} = ctx.request.body;
  if (!name) {
    ctx.throw(400)
  } else {
    try {
      const user = await User.findOne({name});
      if (!user) {
        ctx.body = {success: true};
      } else {
        ctx.body = {success: false, error: 'Имя занято'};
      }
    } catch (error) {
      ctx.throw(error);
    }
  }
}
