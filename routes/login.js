const passport = require('koa-passport');
const jwt = require("jwt-simple");
const User = require('../models/user');
const config = require('config');


exports.post = async function(ctx, next) {
  const {email, password} = ctx.request.body;
  const user = await User.findOne({ email });
  if (!user || !user.checkPassword(password)) {
    ctx.body = {
      success: false,
      error: 'Invaild data'
    };
  } else {
    const payload = {
      id: user._id
    };
    const token = jwt.encode(payload, config.secret);
    ctx.req.user = user;
    ctx.set('Token', token);
    ctx.body = {
      success: true,
      user: user.getPublicFields(),
      token,
    };
  }
}


// exports.post = async (ctx, next) => {
//   const {email, password} = ctx.request.body;
//   console.log(ctx.isAuthenticated());
//   if (!email || !password) {
//     ctx.body = {
//       success: false,
//       message: 'Enter email or password'
//     };
//   }
//   return passport.authenticate('local', async function(err, user, info) {
//     if (err) throw err;
//
//     if (user === false) {
//       ctx.status = 401;
//       ctx.body = {
//         success: false,
//         message: info
//       };
//     } else {
//       ctx.body = {
//         success: true,
//         user: user.getPublicFields()
//       };
//       await ctx.login(user);
//     }
//   })(ctx, next);
//
// }
