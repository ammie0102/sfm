const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "ammie0102",
    host: "localhost",
    port: 5432,
    database: "sfm",
});

module.exports = pool;
