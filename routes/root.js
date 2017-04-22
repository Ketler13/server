const Split = require('../models/split');
const renderToString = require('react-dom/server');
// const fs = require('fs');
// const path = require('path');
// const bundle = fs.readFileSync(path.resolve(__dirname, '../../../react/app/index.html'));


function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="container">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>  `
}

module.exports = async (ctx) => {
  ctx.body = 'Hello';
};
