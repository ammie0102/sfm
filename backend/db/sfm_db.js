const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "dyasmir",
    host: "54.179.35.184",
    port: 5432,
    database: "sfm",
});

module.exports = pool;
