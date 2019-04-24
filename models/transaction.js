'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transactions', {
    amount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};