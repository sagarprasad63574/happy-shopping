"use strict";
/** Database setup for happy_shopping. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
      user: 'sagarprasad63574',
      host: 'localhost',
      database: getDatabaseUri(),
      password: 'Wizard101pirate101!',
      port: 5432,
  });
} else {
  db = new Client({
      user: 'sagarprasad63574',
      host: 'localhost',
      database: getDatabaseUri(),
      password: 'Wizard101pirate101!',
      port: 5432,
  });
}

db.connect();

module.exports = db;