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
    firstname: DataTypes.STRING,
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
      hashPassword: function() {
        return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password) {
        return bcrypt.compare(password, this.password);
      },
    }
  });

  User.beforeCreate((user, options) => {
    user.hashPassword();
  });

  User.sync();

  return User;
};
