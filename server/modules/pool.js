const pg = require("pg");

const pool = new pg.Pool ({
    database: "weekend-to-do-app",
    host: "Localhost",
    port:5432
})

module.exports = pool;