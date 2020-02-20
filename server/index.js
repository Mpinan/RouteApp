const express = require("express");
const bodyParser = require("body-parser");
const queries = require("./querys");
const app = express();
const port = 3001;
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests
const helmet = require("helmet"); // creates headers that protect from attacks (security)
// require("dotenv").config();

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
app.use(morgan("combined"));

app.get("/", (request, response) => {
  response.send([1, 2, 3]);
});

app.get("/movies", queries.getUsers);
app.get("/movies/:id", queries.getUserById);
app.post("/movies", queries.createUser);
app.put("/movies/:id", queries.updateUser);
app.delete("/movies/:id", queries.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
