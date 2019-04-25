'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    category_name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};