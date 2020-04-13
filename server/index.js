const express = require("express");
const bodyParser = require("body-parser");
const queries = require("./querys");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Pool = require("pg").Pool;

const app = express();
const port = 3001;
const cors = require("cors"); // allows/disallows cross-site communication
const helmet = require("helmet"); // creates headers that protect from attacks (security)

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true
  })
);

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(helmet());
app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

//Routes

app.get("/users", queries.getUsers);

app.get("/user/:id", (req, res, next) => {
  console.log(req);
  queries.findUserByEmail(req.body.email).then(user => {
    console.log(user);
  });
});

app.post("/login/user", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  queries
    .findUserByUsername(username)
    .then(user => {
      const hash = user.rows[0].password;
      bcrypt.compare(password, hash).then(results => {
        if (results) {
          jwt.sign({ user: req.body }, "secretKey", (err, token) => {
            res.json({
              username,
              token
            });
          });
        } else {
          return res.status(401).send("Wrong password");
        }
      });
    })
    .catch(err => {
      return res.status(401).send("Wrong user");
    });
});

app.post("/signup/users", (req, res, next) => {
  queries
    .findUserByEmail(req.body.user.email)
    .then(user => {
      console.log(user.rows);
      if (user.rows.length > 0) {
        res.status(401).send("this email is already in use");
      } else {
        queries.createUser(req.body.user, res);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

app.put("/user/:id", queries.updateUser);
app.delete("/user/:id", queries.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorizaion"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
