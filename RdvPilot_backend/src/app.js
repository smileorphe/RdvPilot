const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const rendezvousRoutes = require('./routes/rendezvous.routes');
app.use('/api/rendezvous', rendezvousRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API de gestion de rendez-vous avec MySQL',
    status: '✅ Connecté à MySQL'
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

module.exports = app;