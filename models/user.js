'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  //TODO: Need to investigate how to make pswd as hash
  User.prototype.comparePassword = function(password) {
    bcrypt.compareSync(password, this.password);
  } 

  return User;
};
