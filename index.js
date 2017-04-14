// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

const config = require('config');
const app = require('./app');

app.listen(config.get('port'));
