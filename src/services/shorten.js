'use strict';
const ValidUrl = require("valid-url");
const shortid = require("shortid");
const sha1 = require('sha1');

const params = require('../configs/params');
const model = require("../models/shorten");

module.exports = {
    get: async function(code) {
        try {
            return await model.getByCode(code);
        }
        catch (err) {
            console.log(err.message);
        }
    },

    generate: async function(key, url) {
        if (key != params.key) {
            return null;
        }

        if (!ValidUrl.isUri(url)) {
            return null;
        }

        try {
            const hash = sha1(url);
            const data = await model.getByHash(hash);
            if (data) return data;

            const code = shortid.generate();

            console.log('code',code)
            const shortUrl = `${params.url}/${code}`;

            const success = await model.save(url, code, shortUrl, hash);
            if (success) {
                return {
                    url_code: code,
                    short_url: shortUrl,
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }

        return null
    }
}