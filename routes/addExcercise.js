const Excercise = require('../models/excercise');

exports.post = async (ctx) => {
  const { title, text } = ctx.request.body;
  if (!title || !text) {
    ctx.throw(402);
  }
  try {
    await Excercise.create(ctx.request.body);
    ctx.body = {success: true};
  } catch (error) {
    if (error.errors.title.message) {
      ctx.body = {
        success: false,
        error: error.errors.title.message
      };
    } else {
      ctx.throw(400);
    }
  }
}
