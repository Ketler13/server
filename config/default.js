module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: 'mysecret',
  port: process.env.PORT || 3000,
  root: process.cwd(),
  mongo_uri: process.env.MONGODB_URI || 'mongodb://localhost/diary'
};
