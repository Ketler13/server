exports.post = async (ctx, next) => {
  console.log(ctx.isAuthenticated());
  await ctx.logout();
  console.log(ctx.isAuthenticated());
  ctx.body = {success: true};
}
