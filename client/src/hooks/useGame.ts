// src/hooks/useGame.ts
import { useSelector, useDispatch } from 'react-redux';
import { startGame, updateScore } from '../store/slices/gameSlice';
import type { RootState } from '../store';

export const useGame = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);

  return {
    gameState,
    startGame: () => dispatch(startGame()),
    updateScore: (points: number) => dispatch(updateScore(points))
  };
};