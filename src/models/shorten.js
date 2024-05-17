'use strict';
const dayjs = require('dayjs');
const { table } = require('../configs/params');
const { pool, readerPool } = require('../configs/db');

module.exports = {
    getByCode: function(code) {
        return new Promise(function(resolve, reject) {
            readerPool.query(`SELECT original_url FROM ${table} WHERE url_code = ? LIMIT 1`, [code], function(error, results){
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const original_url = results[0]['original_url'];
                        const words = original_url.split('___GDUUID:');
                        resolve(words[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    },

    getByHash: function(hash) {
        return new Promise(function(resolve, reject) {
            readerPool.query(`SELECT url_code as code, short_url as shortUrl, hash_url as hash FROM ${table} WHERE hash_url = ? LIMIT 1`, [hash], function(error, results){
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0] || null);
                }
            });
        });
    },

    save: function(url, code, shortUrl, hash) {
        return new Promise(function(resolve, reject) {
            const createdAt = dayjs().unix();
            const updatedAt = createdAt;
            const sql = `INSERT INTO ${table} (original_url, url_code, short_url, hash_url, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;

            pool.query(sql, [url, code, shortUrl, hash, createdAt, updatedAt], function(error){
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    },
}