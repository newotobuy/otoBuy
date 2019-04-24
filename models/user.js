'use strict';
const bcrypt= require('bcrypt-nodejs')
const salt= bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg: 'Please input email in correct format'
        },
        isUnique(value){
          return User.findOne({where: { username: value }})
          .then(email=>{
            if(email) throw new Error ('Email has been used')
          })
          .catch(err=>{
            throw new Error (err.message)
          })
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [8,12],
          msg: 'Less password length. Password length 8-12 character'
        }

      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here

    User.belongsToMany(models.Items,{
      through: "Transactions",
      foreignKey: "user_id"
    })

  };
  return User;
};