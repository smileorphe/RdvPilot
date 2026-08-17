const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Mettez false en production
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true, // Ajoute automatiquement createdAt et updatedAt
      underscored: true // Utilise snake_case pour les noms de colonnes
    }
  }
);

// Test de connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL établie avec succès.');
  } catch (error) {
    console.error('❌ Impossible de se connecter à MySQL:', error);
  }
};

module.exports = { sequelize, testConnection };