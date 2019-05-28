// Loading and initializing the library:
const pgp = require("pg-promise")({ capSQL: true });

// Creating a new database instance from the connection details:
const db = pgp({
  user: process.env.FFL_DB_USER,
  host: "localhost",
  database: "ffl_draft",
  password: process.env.FFL_DB_PASS,
  port: 5432
});

// Exporting the database object for shared use:
module.exports = { pgp, db };
