const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`<html>
    <head>
      <title>hello</title>
    </head>
    <body>
      <h1>Hallo, ini route root node js</h1>
    </body>
    </html>`);
    return res.end();
  }
  res.write(`<html>
    <head>
      <title>kedua</title>
    </head>
    <body>
      <h3>ini kedua</h3>
    </body>
  </html>`);
  res.end();
});

server.listen(3000);
