const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET ROUTE for All Songs
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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

// create a route for updating song data
router.put('/:id', (req, res) => {
  const itemId = req.params.id;
  const newSongData = req.body;
  const queryText = `UPDATE "songs"
    SET "artist"=$1, "rank"=$2, "track"=$3, "published"=$4
    WHERE "id" = $5;`;

  pool.query(queryText, [
    newSongData.artist,
    newSongData.rank,
    newSongData.track,
    newSongData.published,
    itemId,
  ])
  .then((responseDb) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('Error updating song:', err);
    res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  const itemId = req.params.id;
  const queryText = `DELETE FROM "songs" WHERE "id" = $1;`;

  pool.query(queryText, [
    itemId
  ])
  .then((responseDb) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('Error deleting song:', err);
    res.sendStatus(500);
  });
});

module.exports = router;
