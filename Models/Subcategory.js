// models/Subcategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Category = require('./Category');

const Subcategory = sequelize.define('Subcategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, 
      key: 'id' 
    }
  }
});


module.exports = Subcategory;
