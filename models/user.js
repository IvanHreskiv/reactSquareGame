'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
        isEmail: true, 
        len: [1, 255]
      }
    },
    firstname: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    indexes: [{unique: true, fields: ['email', 'username']}],
    classMethods: {
      hashPassword: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password) {
        return bcrypt.compareSync(password, bcrypt.genSaltSync(8), null);
      },
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.beforeCreate((user, options) => {
    return hashPassword(user.password).then(hashedPw => {
      user.password = heshedPw;
    });
  });



  return User;
};
