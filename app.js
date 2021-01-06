const http = require('http');

const server = http.createServer((req, res) => {
  res.write(`<html>
  <head>
    <title>hello</title>
  </head>
  <body>
    <h1>Hallo, ini node js</h1>
  </body>
  </html>`);
  res.end();
});

server.listen(3000);