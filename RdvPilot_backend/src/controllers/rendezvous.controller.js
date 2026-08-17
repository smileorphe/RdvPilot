const { RendezVous } = require('../models');
const { Op } = require('sequelize');

// Récupérer tous les rendez-vous
exports.getAll = async (req, res) => {
  try {
    const rendezvous = await RendezVous.findAll({
      order: [['date', 'ASC']],
      attributes: { exclude: [] }
    });
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors du chargement des rendez-vous', 
      error: error.message 
    });
  }
};

// Récupérer un rendez-vous par ID
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const rdv = await RendezVous.findByPk(id);
    
    if (!rdv) {
      return res.status(404).json({ 
        message: `Rendez-vous avec l'ID ${id} non trouvé` 
      });
    }
    
    res.json(rdv);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du rendez-vous', 
      error: error.message 
    });
  }
};

// Créer un rendez-vous
exports.create = async (req, res) => {
  try {
    const { titre, client, date, description, statut } = req.body;
    
    // Validation
    if (!titre || !client || !date) {
      return res.status(400).json({
        message: 'Titre, client et date sont requis'
      });
    }
    
    const newRdv = await RendezVous.create({
      titre,
      client,
      date,
      description: description || '',
      statut: statut || 'à venir'
    });
    
    res.status(201).json(newRdv);
  } catch (error) {
    // Gestion des erreurs de validation Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erreur de validation',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ 
      message: 'Erreur lors de la création du rendez-vous', 
      error: error.message 
    });
  }
};

// Mettre à jour un rendez-vous
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const rdv = await RendezVous.findByPk(id);
    if (!rdv) {
      return res.status(404).json({ 
        message: `Rendez-vous avec l'ID ${id} non trouvé` 
      });
    }
    
    await rdv.update(data);
    res.json(rdv);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erreur de validation',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ 
      message: 'Erreur lors de la modification du rendez-vous', 
      error: error.message 
    });
  }
};

// Supprimer un rendez-vous
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const rdv = await RendezVous.findByPk(id);
    if (!rdv) {
      return res.status(404).json({ 
        message: `Rendez-vous avec l'ID ${id} non trouvé` 
      });
    }
    
    await rdv.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression', 
      error: error.message 
    });
  }
};

// Récupérer les rendez-vous par statut (fonctionnalité supplémentaire)
exports.getByStatut = async (req, res) => {
  try {
    const { statut } = req.params;
    const rendezvous = await RendezVous.findAll({
      where: { statut },
      order: [['date', 'ASC']]
    });
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors du filtrage', 
      error: error.message 
    });
  }
};

// Récupérer les rendez-vous d'une période (fonctionnalité supplémentaire)
exports.getByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    const where = {};
    
    if (start) where.date = { [Op.gte]: new Date(start) };
    if (end) where.date = { ...where.date, [Op.lte]: new Date(end) };
    
    const rendezvous = await RendezVous.findAll({
      where,
      order: [['date', 'ASC']]
    });
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la recherche par date', 
      error: error.message 
    });
  }
};