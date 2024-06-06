const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Market = require('./Market');
const Subcategory = require("./Subcategory");
const Product = require('./Products');

const FeaturedProduct = sequelize.define('FeaturedProduct', {
 
  
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, // Reference the Market model
      key: 'id' // Name of the referenced column in the Market model
    }
  }
});

// Define association after Market model is required

module.exports = FeaturedProduct;