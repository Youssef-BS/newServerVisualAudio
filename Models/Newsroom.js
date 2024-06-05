const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Market = require('./Market');
const Subcategory = require("./Subcategory");
const Product = require('./Products');

const Newsroom = sequelize.define('Newsroom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, 
      key: 'id' 
    }
  }
  
});

// Define association after Market model is required

module.exports = Newsroom;