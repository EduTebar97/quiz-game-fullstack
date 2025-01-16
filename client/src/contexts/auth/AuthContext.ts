// src/contexts/auth/AuthContext.ts
import { createContext } from 'react';
import { AuthContextType } from './types';

// Solo creamos y exportamos el contexto
export const AuthContext = createContext<AuthContextType | null>(null);