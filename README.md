# PG Introduction

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

## Accessing our database from Node with PG
From our code's point of view, we need a way to talk to our new database server and tables. We need to connect to our database server before issuing queries. We will be using an npm package called `pg`.

Add it to our application dependencies: `$ npm install pg`
