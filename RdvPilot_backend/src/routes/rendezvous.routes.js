const express = require('express');
const router = express.Router();
const controller = require('../controllers/rendezvous.controller');

// Routes CRUD
router.get('/', controller.getAll);
router.get('/statut/:statut', controller.getByStatut); // Filtrage par statut
router.get('/date-range', controller.getByDateRange); // Filtrage par période
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;