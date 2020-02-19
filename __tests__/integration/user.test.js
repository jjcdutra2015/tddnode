import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import truncate from '../util/truncate';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Julio Dutra',
        email: 'julio@rocketseat.com.br',
        password_hash: '1234567',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Julio Dutra',
      email: 'julio@rocketseat.com.br',
      password: '1234567',
    });

    const compareHash = await bcrypt.compare('1234567', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Julio Dutra',
        email: 'julio@rocketseat.com.br',
        password: '1234567',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Julio Dutra',
        email: 'julio@rocketseat.com.br',
        password: '1234567',
      });

    expect(response.status).toBe(400);
  });
});
