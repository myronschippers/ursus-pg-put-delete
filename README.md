# PG, PUT and DELETE Routes

[PG](https://www.npmjs.com/package/pg) is a node module that allows us to communicate with our PostgreSQL database.

PG lives between the server and database:

```
,________,         .------,            .------,                  .------.
|________|       ,'_____,'|    req > ,'_____,'|                 (        )
|        |       |      | |          | ____ | |       PG        |~------~|
|        |       |      | | - AJAX - | ____ | |    <------->    |~------~|
|        |       |      | ;          | ____ | ;                 |~------~|
|________|       |______|'   < res   |______|'                  `.______.'
 HTML/CSS          jQuery          Node / Express               PostgreSQL
```

## PUT

SQL Query used on Database:

```SQL
UPDATE "songs" SET "artist"='Chris Black' WHERE "id" = 1;
```

Server route for updating data on database:

```js
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
```


## DELETE

SQL Query used on Database:

```SQL
DELETE FROM "songs" WHERE "id" = 2;
```

Server route for deleting data on database:

```js
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
```
