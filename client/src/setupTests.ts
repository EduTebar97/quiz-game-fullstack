import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
// afterEach está globalmente disponible en Jest
// No necesitamos importarlo

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});

// Mock de fetch global
global.fetch = jest.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock de ResizeObserver
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};