import mongoose from 'mongoose';

const TEST_MONGODB_URI = 'mongodb://localhost:27017/test-db';

beforeAll(async () => {
  try {
    await mongoose.connect(TEST_MONGODB_URI);
    console.log('Connected to test database');
  } catch (error) {
    console.error('Error connecting to test database:', error);
    throw error;
  }
});

afterEach(async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error closing test database connection:', error);
    throw error;
  }
});