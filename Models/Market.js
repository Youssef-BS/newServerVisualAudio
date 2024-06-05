// models/Market.js
const { DataTypes, HasMany } = require('sequelize');
const sequelize = require('../config');
const Category = require('./Category')
const Market = sequelize.define('Market', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = Market;
