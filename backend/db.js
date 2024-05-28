const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // depends on your db name
  database: "capstonedb",
  password: "atchima1234",
  port: 5432,
});

module.exports = pool;
