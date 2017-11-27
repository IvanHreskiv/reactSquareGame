var models = require('./models');

describe('UserTest', function () {
  var user;

  beforeEach(function(done) {
    user = models.User.build({
      username: "username",
      password: "passsword",
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@rmail.com'
    })
    done();
  });

  it('should be valid', function() {
    user.validate().then(function(errors) {
      expect(errors).toBe(null);
    });
  });

  it('username should be present', function() {
    user.username = '     ';
    user.validate().then(function(errors) {
      expect(errors.message).toEqual(
        'Validation error: Validation notEmpty failed'
      );
    });
  });

  it('email should be present', function() {
    user.email = '';
    user.validate().then(function(errors) {
      expect(errors.name).toEqual('SequelizeValidationError');
    });
  });

  it('username should not be too long', function() {
    user.username = 'a'.repeat(501);
    user.validate().then(function(errors) {
      expect(errors.name).toEqual('SequelizeValidationError');
    });
  });

  it('email should not be too long', function() {
    user.email = 'a'.repeat(244) + "@exaple.com";
    user.validate().then(function(errors) {
      expect(errors.name).toEqual('SequelizeValidationError');
    });
  });
  //TODO: create test more test

  it('password should be heshed', function() {
    user.save().then(function(errors) {
      expect(errors.name).toEqual('SequelizeValidationError');
    });
  });

});
