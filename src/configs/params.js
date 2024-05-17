"use strict";
require("dotenv").config();

const env = process.env;
module.exports = {
  db: {
    host: env.RDS_HOST,
    user: env.RDS_USERNAME,
    port: env.RDS_PORT,
    password: env.RDS_PASSWORD,
    name: env.RDS_DATABASE,
  },
  dbreader: {
    host: env.RDS_HOST,
    user: env.RDS_USERNAME,
    port: env.RDS_PORT,
    password: env.RDS_PASSWORD,
    name: env.RDS_DATABASE,
  },
  port: env.PORT || 6000,
  table: env.DB_TABLE,
  url: env.URL,
  key: env.SERVER_KEY,
};
