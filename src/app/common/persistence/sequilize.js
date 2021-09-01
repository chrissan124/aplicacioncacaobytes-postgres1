import Sequilize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequilize = new Sequilize(
  process.env.DM_POSTGRES_DB_NAME,
  process.env.DM_POSTGRES_DB_USER,
  process.env.DM_POSTGRES_DB_PASS,
  {
    dialect: 'postgres',
  }
);

export default sequilize;
