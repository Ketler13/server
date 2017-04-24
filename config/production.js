const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  server: {
    siteHost: 'http://localhost'
  },
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'oleksandr.martyshchenko',
      password: 'ketler13'
    },
    senders:  {
      default:  {
        fromEmail: 'oleksandr.martyshchenko@gmail.com',
        fromName:  'oleksandr',
        signature: "<em>С уважением,<br>gymlog</em>"
      }
    }
  },
  secret: 'mysecret',
  port: process.env.PORT || 3000,
  root: process.cwd(),
  mongo_uri: process.env.MONGODB_URI || 'mongodb://localhost/diary',
  crypto: {
    hash: {
      length:     128,
      iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
    }
  },
  template: {
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    })
  }
};
