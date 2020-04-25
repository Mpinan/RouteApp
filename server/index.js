const express = require("express");
const bodyParser = require("body-parser");
const userQueries = require("./Queries/userQuerys");
const routesQueries = require("./Queries/routesQueries");
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
    extended: true,
  })
);

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(helmet());
app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

//UserRoutes

app.get("/users", userQueries.getUsers);

app.get("/user/:id", (req, res, next) => {
  console.log(req);
  userQueries.findUserByEmail(req.body.email).then((user) => {
    console.log(user);
  });
});

app.post("/login/user", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  userQueries
    .findUserByUsername(username)
    .then((user) => {
      const userID = user.rows[0].uid;
      const hash = user.rows[0].password;
      bcrypt.compare(password, hash).then((results) => {
        if (results) {
          jwt.sign({ user: req.body }, "secretKey", (err, token) => {
            res.json({
              userID,
              username,
              token,
            });
          });
        } else {
          return res.status(401).send("Wrong password");
        }
      });
    })
    .catch((err) => {
      return res.status(401).send("Wrong user");
    });
});

app.post("/signup/users", (req, res, next) => {
  userQueries
    .findUserByEmail(req.body.user.email)
    .then((user) => {
      console.log(user.rows);
      if (user.rows.length > 0) {
        res.status(401).send("this email is already in use");
      } else {
        userQueries.createUser(req.body.user, res);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

app.put("/user/:id", userQueries.updateUser);
app.delete("/user/:id", userQueries.deleteUser);

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

// RoutesRoutes

app.get("/routes", routesQueries.getRoutes);
app.post("/create/route", (req, res, next) => {
  routesQueries.createRoute(req, res);
});
