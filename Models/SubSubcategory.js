const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Subcategory = require('./Subcategory');

const SubSubcategory = sequelize.define('SubSubcategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subcategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subcategory, 
      key: 'id' 
    }
  }
});

module.exports = SubSubcategory;