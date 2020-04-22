const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Llatrese34",
  port: 5432,
});

const getRoutes = (request, response) => {
  pool.query("SELECT * FROM routes ORDER BY uid ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//   const getUserById = (request, response) => {
//     console.log(request);
//     const id = parseInt(request.params.id);
//     pool.query("SELECT * FROM users WHERE uid = $1", [id], (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     });
//   };

//   const findUserByUsername = username => {
//     return pool.query("SELECT * FROM users WHERE username = $1", [username]);
//   };

//   const findUserByEmail = email => {
//     // send just email instead
//     return pool.query("SELECT * FROM users WHERE email = $1", [email]);
//   };

const createRoute = (request, response) => {
  const { name, method, origin, destination, uid } = request;

  pool.query(
    `INSERT INTO routes (name, method, origin, destination, uid) VALUES ($1, $2, $3, $4, $5 )`,
    [name, method, origin, destination, uid],
    (error, results) => {
      if (error) {
        response.status(500).send("errorcito");
      } else {
        response.status(201).send("RUTA NUEVA");
      }
    }
  );
};

//   const updateUser = (request, response) => {
//     const id = parseInt(request.params.id);
//     const { username, email } = request.body;

//     pool.query(
//       "UPDATE users SET username = $1, email = $2 WHERE uid = $3",
//       [username, email, id],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         response.status(200).send(`User modified with ID: ${id}`);
//       }
//     );
//   };

//   const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id);
//     pool.query("DELETE FROM users WHERE uid = $1", [id], (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User deleted with ID: ${id}`);
//     });
//   };

module.exports = {
  getRoutes,
  createRoute,
  // updateUser,
  // deleteUser,
  // findUserByEmail,
  // findUserByUsername
};
