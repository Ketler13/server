const pick = require('lodash/pick');
const Split = require('../libs/split');

exports.get = async (ctx) => {
  const splits = await Split.find({});
  ctx.body = splits.map(split => {
    const id = split._id;
    return Object.assign({}, pick(split, Split.publicFields), {id});
  });
};
