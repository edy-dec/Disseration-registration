import { Sequelize } from 'sequelize';
import config from './database.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;

if (env === 'production') {
  // Pentru Azure PostgreSQL sau alte cloud providers
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      define: dbConfig.define,
      pool: dbConfig.pool,
      dialectOptions: dbConfig.dialectOptions
    }
  );
} else {
  // Pentru development local
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      define: dbConfig.define,
      pool: dbConfig.pool
    }
  );
}

// Testarea conexiunii
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexiunea la PostgreSQL a fost stabilita cu succes!');
  } catch (error) {
    console.error('❌ Nu s-a putut conecta la PostgreSQL:', error.message);
  }
};

export { sequelize, testConnection };
export default sequelize;
