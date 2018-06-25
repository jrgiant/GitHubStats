const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 8080;

http.createServer((req, res) => {
  let requestUrl = url.parse(req.url).pathname || 'index.html';
  requestUrl = path.join(__dirname, requestUrl);
  if (fs.statSync(requestUrl).isDirectory()) requestUrl = path.join(requestUrl, 'index.html');
  console.log(requestUrl);
  try {
    const contentTypes = {

      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.svg': 'image/svg+xml',

    };
    fs.readFile(requestUrl, (err, data) => {
      if (err === null) {
        const header = {};
        const contentType = contentTypes[path.extname(requestUrl)];
        if (contentType) {
          header.contentType = contentType;
        }
        res.writeHead(200, header);
        res.write(data);
        res.end();
      } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write(`<!DOCTYPE HTML><html><head><title>${err.message}</title><body>${err.message}</body></html>`);
        res.end();
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/html' });
    res.write(`<!DOCTYPE HTML><html><head><title>SERVER ERROR</title><body>${error.message}</body></html>`);
    res.end();
  }
}).listen(port);
