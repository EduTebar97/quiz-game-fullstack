import type { Application } from 'express-serve-static-core';
import request from 'supertest';
import { createApp } from '../../app';

describe('Auth Routes', () => {
  let app: Application;

  beforeAll(async () => {
    app = await createApp();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'new@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('username', 'newuser');
    });
  });
});