const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const Pool = pg.Pool;
const PORT = process.env.PORT || 5000;

// Configuring the pool connection from the server to the database
const pool = new Pool({
  database: 'music_storage', // the name of database, !! This Can Change !!
  host: 'localhost', // where is your database? (on my machine)
  port: 5432, // the port for the database, 5432 is default for postgres
  max: 10, // how many connections (queries) at one time
  idleTimeoutMills: 30000, // 30 seconds to try to connect, otherwise  cancel query
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// STATIC FILE SETUP/CONFIGURATION
app.use(express.static('public'));

// GET ROUTE for All Songs
app.get('/songs', (req, res) => {
  const queryText = `SELECT * FROM "songs";`;
  pool.query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log('ERROR:', err);
      res.sendStatus(500);
    });
});

// POST ROUTE for saving a song
app.post('/songs', (req, res) => {
  const dataSentFromClient = req.body;
  // EXPECTED DATA STRUCTURE FROM CLIENT/REQUEST
  // {
  //   rank: 0,
  //   track: '',
  //   artist: '',
  //   published: '1-1-2001',
  // }

  // Have to remember single quotes around string values placed in query
  // const queryText = `INSERT INTO "songs" ("rank", "track", "artist", "published")
  // VALUES (${dataSentFromClient.rank}, '${dataSentFromClient.track}', '${dataSentFromClient.artist}', '${dataSentFromClient.published}');`;

  // Using the pool/pg placeholders of $1, $2,.. etc to help sanitize our values
  const queryText = `INSERT INTO "songs" ("rank", "track", "artist", "published")
  VALUES ($1, $2, $3, $4);`;

  pool.query(queryText, [dataSentFromClient.rank, dataSentFromClient.track, dataSentFromClient.artist, dataSentFromClient.published])
    .then((responseDb) => {
      console.log(responseDb);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR:', err);
      res.sendStatus(500);
    });
});

// KICK OFF APP
app.listen(PORT, () => {
  console.log('Server running on PORT:', PORT);
});
