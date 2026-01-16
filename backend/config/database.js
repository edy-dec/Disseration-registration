
const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Config pentru PostgreSQL, local și Azure
 * Folosește variabile de mediu pentru conexiune locală sau DATABASE_URL pentru Azure/Heroku
 */
const DB_DIALECT = process.env.DB_DIALECT || "postgres";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || "dissertation_db";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASS = process.env.DB_PASS || "postgres";
const DB_URL = process.env.DATABASE_URL; // pentru Azure sau Heroku

let sequelize;
if (DB_URL) {
  // Azure/Heroku style connection string
  sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
    },
  });
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
    },
  });
}

module.exports = sequelize;
