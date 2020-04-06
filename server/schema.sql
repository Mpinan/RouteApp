CREATE DATABASE Todo


CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  password VARCHAR(255),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE
);

-- CREATE TABLE userSession (
--   uid SERIAL PRIMARY KEY,
--   username VARCHAR(255) UNIQUE,
--   email VARCHAR(255),
--   password VARCHAR(255),
--   email_verified BOOLEAN,
--   date_created DATE,
--   last_login DATE
-- );

DELETE FROM users



// psql -U postgres

