const Split = require('../libs/split');

exports.post = async (ctx) => {
  console.log(ctx.request.body)
  const split = await Split.create(ctx.request.body)
  if (split) {
    ctx.body = {success: true};
  } else {
    ctx.body = {success: false};
  }
}
