const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Llatrese34",
  port: 5432
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY uid ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("SELECT * FROM users WHERE uid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserByEmail = (request, response) => {
  const email = parseInt(request.params.email);
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (email) {
        console.log(email);
        console.log("user already exists");
        throw error;
      } else {
        console.log(results);
        console.log("email after else");
        return;
      }
    }
  );
};

const createUser = (request, response) => {
  getUserByEmail(request, response);
  const date_created = new Date();
  const { username, email, password } = request.body;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      pool.query(
        `INSERT INTO users (username, email, password, date_created) VALUES ($1, $2, $3, $4 )`,
        [username, email, hash, date_created],
        (error, results) => {
          console.log(results);

          if (error) {
            throw error;
          }
          response.status(201).send(`User added with ID: ${results.insertId}`);
        }
      );
    });
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { username, email } = request.body;

  pool.query(
    "UPDATE users SET username = $1, email = $2 WHERE uid = $3",
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE uid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
