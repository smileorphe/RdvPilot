const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RendezVous = sequelize.define('RendezVous', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le titre est requis'
      },
      len: {
        args: [2, 255],
        msg: 'Le titre doit contenir entre 2 et 255 caractères'
      }
    }
  },
  client: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le nom du client est requis'
      }
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'La date doit être valide'
      },
      isAfter: {
        args: new Date().toISOString(),
        msg: 'La date doit être dans le futur'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  statut: {
    type: DataTypes.ENUM('à venir', 'terminé', 'annulé'),
    allowNull: false,
    defaultValue: 'à venir'
  }
}, {
  tableName: 'rendezvous',
  timestamps: true, // Ajoute createdAt et updatedAt
  underscored: true
});

module.exports = RendezVous;