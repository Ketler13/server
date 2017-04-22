const passport = require('koa-passport');

exports.post = async (ctx, next) => {
  const {email, password} = ctx.request.body;
  if (!email || !password) {
    ctx.body = {
      success: false,
      message: 'Enter email or password'
    };
  }
  return passport.authenticate('local', async function(err, user, info) {
    if (err) throw err;

    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: info 
      };
    } else {
      ctx.body = {
        user: user.getPublicFields()
      };
      await ctx.login(user);
    }
  })(ctx, next);

}
