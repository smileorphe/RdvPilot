const app = require('./src/app');
const { testConnection } = require('./src/config/database');
const { syncDatabase } = require('./src/models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Tester la connexion à la base de données
    await testConnection();
    
    // Synchroniser les modèles avec la base de données
    // force: false pour ne pas supprimer les données existantes
    await syncDatabase(false);
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📋 API Rendez-vous : http://localhost:${PORT}/api/rendezvous`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();