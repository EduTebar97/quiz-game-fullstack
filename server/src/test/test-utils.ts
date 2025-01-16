import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from '../features/auth/models/user.model';

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const createTestUser = async () => {
  try {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    return { user, token };
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
};

export const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`
});