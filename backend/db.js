const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // depends on your db name
  database: "capstone_db",
  password: "Saete373",
  port: 5432,
});

module.exports = pool;
