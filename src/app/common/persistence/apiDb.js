const Sequilize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const apiDb = new Sequilize(
  process.env.DM_POSTGRES_DB_NAME,
  process.env.DM_POSTGRES_DB_USER,
  process.env.DM_POSTGRES_DB_PASS,
  {
    dialect: 'postgres',
  }
);

module.exports = apiDb;
