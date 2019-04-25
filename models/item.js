'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Items', {
    item_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Categories, {foreignKey: 'category_id'})
    Item.hasMany(models.Transactions, {foreignKey: 'item_id'})
   };
  return Item;
};