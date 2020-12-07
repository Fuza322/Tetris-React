import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [goal, setGoal] = useState(1000);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore(prev => prev + linePoints[rowsCleared - 1]);
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  if (score > 0)
    console.log(score);

  return [score, setScore, goal, setGoal, rows, setRows, level, setLevel];
};
