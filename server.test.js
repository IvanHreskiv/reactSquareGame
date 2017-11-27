import request from 'supertest';
import app from './server';


describe('server.js', () => {
  let response;

  describe('/api/login', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/login')
        .end((err, res) => {
          response = res;
          done();
        });
    });

    it('should 200', () => {
      expect(response.statusCode).toBe(200);
    });

  });

});
