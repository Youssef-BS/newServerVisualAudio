// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Category = require('./Category');
const Market = require('./Market');
const Subcategory = require('./Subcategory');
const SubSubcategory = require('./SubSubcategory');

const Product = sequelize.define('Product', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  extra_image: {
    type: DataTypes.JSON,
    allowNull: true // Allow extra images to be optional
  },
  extra_video: {
    type: DataTypes.JSON,
    allowNull: true // Allow extra videos to be optional
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock_eta: {
    type: DataTypes.STRING,
    allowNull: true // Allow stock ETA to be optional
  },
  features: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technical_details: {
    type: DataTypes.JSON, // You can use JSONB for storing technical details
    allowNull: true // Allow technical details to be optional
  },
  marketId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Market, // Reference the Market model object directly
      key: 'id' // Name of the referenced column in the Market model
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category, // Reference the Category model object directly
      key: 'id' // Name of the referenced column in the Category model
    }
  },
  subcategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Subcategory, // Reference the Subcategory model object directly
      key: 'id' // Name of the referenced column in the Subcategory model
    }
  },
  subSubcategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: SubSubcategory, // Reference the SubSubcategory model object directly
      key: 'id' // Name of the referenced column in the SubSubcategory model
    }
  }
});

// Define associations


module.exports = Product;
