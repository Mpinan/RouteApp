const { Client } = require("pg");

const client = new Client({
  user: "simone",
  host: "localhost",
  database: "Movies",
  password: ""
});

client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, "Error");
  console.log(res, "Respuesta");
  client.end();
});
