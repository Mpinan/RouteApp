const express = require("express");
const bodyParser = require("body-parser");
const queries = require("./querys");
const app = express();
const port = 3001;
const cors = require("cors"); // allows/disallows cross-site communication
const helmet = require("helmet"); // creates headers that protect from attacks (security)

app.use(bodyParser.json());
app.use(
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
  console.log(req.body.password, "----------");
  queries.findUserByUsername(req.body.username, req.body.password, res);
  // .then(user => {
  //   if (user.rows[0].username === req.body.username) {
  //     console.log(user.rows[0].username);
  //   }
  // });
});

app.post("/signup/user", (req, res, next) => {
  queries
    .findUserByEmail(req)
    .then(user => {
      if (user.rows.length > 0) {
        // console.log(res, "----res in sign up user");
        res.status(400).send("this email is already in use");
      } else {
        queries.createUser(req.body, res);
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
