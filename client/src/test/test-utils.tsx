import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import gameReducer from '@/store/slices/gameSlice';

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { game: gameReducer },
      preloadedState,
    }),
    queryClient = new QueryClient(),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/* eslint-disable react-refresh/only-export-components */
// Re-export everything
export * from '@testing-library/react';
// Override render method
export { render };