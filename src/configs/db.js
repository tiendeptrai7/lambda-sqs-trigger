'use strict';
const mysql = require('mysql2');
const { db, dbreader } = require('./params');

module.exports = {
    pool: mysql.createPool({
        host: db.host,
        port: db.port,
        user: db.user,
        password: db.password,
        database: db.name,
    }),
    readerPool: mysql.createPool({
        host: dbreader.host,
        port: dbreader.port,
        user: dbreader.user,
        password: dbreader.password,
        database: dbreader.name,
    }),
} ;
