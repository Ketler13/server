const Excercise = require('../models/excercise')

exports.get = async (ctx) => {
  const title = ctx.query.title;
  if (!title) {
    ctx.throw(400);
  } else {
    try {
      const excercise = await Excercise.findOne({title});
      if (!excercise) {
        ctx.body = {success: true};
      } else {
        ctx.throw(409);
      }
    } catch (error) {
      ctx.throw(502);
    }
  }
}