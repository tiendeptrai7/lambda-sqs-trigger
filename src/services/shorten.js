"use strict";
const ValidUrl = require("valid-url");
const shortid = require("shortid");
const sha1 = require("sha1");
const params = require("../configs/params");
const model = require("../models/shorten");

module.exports = {
  get: async function (code) {
    try {
      return await model.getByCode(code);
    } catch (err) {
      console.log(err.message);
    }
  },

  generate: async function (key, url) {

    if (key !== params.key || !ValidUrl.isUri(url)) {
      return null;
    }

    try {

      const code = shortid.generate();

      const shortUrl = `${params.url}/${code}`;

      return { url, code, shortUrl, hash };
    } catch (error) {
      console.error("Error generating short URL:", error.message);
    }

    return null;
  },

  save: async function (data) {
    try {
      const { url, code, shortUrl, hash } = data;
      await model.save(url, code, shortUrl, hash);
    } catch (err) {
      console.log(err.message);
    }
    return false;
  },

  checkExist: async function (url) {

    const hash = sha1(url);

    const existingData = await model.getByHash(hash);

    return existingData ? existingData : null;
  }
};
