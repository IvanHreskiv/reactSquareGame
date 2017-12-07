'use strict';
var Promise = require("bluebird");
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      } },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
        isEmail: true, 
        len: [1, 255]
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    indexes: [{unique: true, fields: ['email', 'username']}],
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareAsync(password, this.password);
      },
    }
  });

  User.beforeCreate((user, options) => {
    return bcrypt.genSaltAsync(8).then(function(salt) {
      return bcrypt.hashAsync(user.password, salt, null);
    }).then(function(hash) {
      user.setDataValue('password', hash);
    }).catch(function(err) {
      return squelize.Promise.reject(err);
    })
  });

  User.sync();

  return User;
};
