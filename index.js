const express = require("express");
const bodyParser = require("body-parser");
const db = require("./querys");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/movies", db.getUsers);
app.get("/movies/:id", db.getUserById);
app.post("/movies", db.createUser);
app.put("/movies/:id", db.updateUser);
app.delete("/movies/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
