import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be albe to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Julio Dutra',
        email: 'julio@rocketseat.com.br',
        password_hash: '1234567',
      });

    expect(response.body).toHaveProperty('id');
  });
});
