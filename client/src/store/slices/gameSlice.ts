// src/store/slices/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'finished';
  currentQuestion: number;
  score: number;
  timeRemaining: number;
}

const initialState: GameState = {
  status: 'idle',
  currentQuestion: 0,
  score: 0,
  timeRemaining: 0
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = 'playing';
      state.currentQuestion = 0;
      state.score = 0;
      state.timeRemaining = 60;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    }
  }
});

export const { startGame, updateScore } = gameSlice.actions;
export default gameSlice.reducer;