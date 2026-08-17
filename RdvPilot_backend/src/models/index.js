const { sequelize } = require('../config/database');
const RendezVous = require('./rendezvous.model');

// Synchroniser les modèles avec la base de données
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ 
      force: force, // Si true, supprime et recrée les tables (à utiliser avec précaution)
      alter: true   // Met à jour la structure sans supprimer les données
    });
    console.log('📦 Base de données synchronisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
};

module.exports = {
  sequelize,
  RendezVous,
  syncDatabase
};