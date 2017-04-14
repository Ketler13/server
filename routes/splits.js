const pick = require('lodash/pick');
const Split = require('../libs/split');

exports.get = async (ctx) => {
  const splits = await Split.find({});
  const mappedSplits = splits.map(split => {
    return Object.assign({}, pick(split, Split.publicFields));
  });
  ctx.body = mappedSplits;
};
