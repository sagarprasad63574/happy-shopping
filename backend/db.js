"use strict";
/** Database setup for happy-shopping. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// if (process.env.NODE_ENV === "production") {
//     db = new Client({
//         connectionString: getDatabaseUri(),
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
// } else {
//     db = new Client({
//         connectionString: getDatabaseUri()
//     });
// }

if (process.env.NODE_ENV === "production") {
    db = new Client({
        user: 'sagarprasad63574',
        host: 'localhost',
        database: getDatabaseUri(),
        password: 'Wizard101pirate101!',
        port: 5432,
    });
    // db = new Client({
    //   connectionString: getDatabaseUri(),
    //   ssl: {
    //     rejectUnauthorized: false
    //   }
    // });
} else {
    db = new Client({
        user: 'sagarprasad63574',
        host: 'localhost',
        database: getDatabaseUri(),
        password: 'Wizard101pirate101!',
        port: 5432,
    });
    // db = new Client({
    //   connectionString: getDatabaseUri()
    // });
}

db.connect();

module.exports = db;