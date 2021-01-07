const { Buffer } = require("buffer");

const handleRoute = (req, res) => {
  const url = req.url;
  const method = req.method;
  let username = "";

  if (url === "/") {
    res.write(`<html>
      <head>
        <title>Hallo</title>
      </head>
      <body>
        <h1>Hallo</h1>
        <form action="/create-user" method="POST">
          <input type="text" name="user">
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>`);
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const user = [];
    req.on("data", (chunk) => {
      user.push(chunk);
    });
    req.on("end", () => {
      const parseUser = Buffer.concat(user).toString();
      username = parseUser.split("=")[1];
      console.log(username);
    });
    res.setHeader("Location", "/");
    return res.end();
  }
  if (url === "/user") {
    res.write(`<html>
      <head>
        <title>Hallo</title>
      </head>
      <body>
        <ul>
          <li>user 1</li>
        </ul>
      </body>
    </html>`);
    return res.end();
  }
};

module.exports = handleRoute;
