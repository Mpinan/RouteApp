const Pool = require("pg").Pool;
const pool = new Pool({
  user: "simone",
  host: "localhost",
  database: "Movies",
  password: "password",
  port: 5432
});
