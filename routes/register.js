const User = require('../models/user');

exports.post = async (ctx) => {
  const {email, name, password} = ctx.request.body;
  if (!email || !name || !password) {
    ctx.throw(400);
  }
  const emailExists = await User.findOne({email});
  const nameExists = await User.findOne({name});
  if (emailExists) {
    ctx.body = {
      success: false,
      message: 'Email занят'
    };
  } else if (nameExists) {
    ctx.body = {
      success: false,
      message: 'Пользователь с таким именем существует'
    };
  } else {
    const user = await User.create({email, name, password});
    if (user) {
      ctx.body = {
        success: true
      };
    } else {
      ctx.body = {
        success: false,
        error: 'Вы ввели некорректные данные'
      }
    }
  }
};
