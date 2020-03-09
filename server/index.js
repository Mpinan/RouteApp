const express = require("express");
const bodyParser = require("body-parser");
const queries = require("./querys");
const app = express();
const port = 3001;
const cors = require("cors"); // allows/disallows cross-site communication
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const { body } = require("express-validator");

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

//routes

app.get("/users", queries.getUsers);
app.get("/user/:id", queries.getUserById);
app.post(
  "/user",
  body("email").custom(value => {
    return User.findUserByEmail(value).then(user => {
      console.log(user);
      if (user) {
        throw new Error("this email is already in use");
      }
    });
  }),
  queries.createUser
);
app.put("/user/:id", queries.updateUser);
app.delete("/user/:id", queries.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
