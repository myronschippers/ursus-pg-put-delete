const pg = require('pg');
const Pool = pg.Pool;

// Configuring the pool connection from the server to the database
const pool = new Pool({
  database: 'music_storage', // the name of database, !! This Can Change !!
  host: 'localhost', // where is your database? (on my machine)
  port: 5432, // the port for the database, 5432 is default for postgres
  max: 10, // how many connections (queries) at one time
  idleTimeoutMills: 30000, // 30 seconds to try to connect, otherwise  cancel query
});

pool.on('connect', () => {
  console.log('Connected to Postgresql pool');
});

pool.on('error', (error) => {
  console.log('Error with Postgresql pool: ', error);
});

module.exports = pool;