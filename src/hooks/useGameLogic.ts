import { useState, useEffect, useCallback } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
type Position = [number, number];

interface GameSettings {
  speed: number;
  gridSize: number;
  borderless: boolean;
}

export const useGameLogic = (settings: GameSettings) => {
  const [snake, setSnake] = useState<Position[]>([[10, 10]]);
  const [food, setFood] = useState<Position>([5, 5]);
  const [bonus, setBonus] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction>('right');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState(1);

  const generateFood = useCallback((): Position => {
    while (true) {
      const x = Math.floor(Math.random() * settings.gridSize);
      const y = Math.floor(Math.random() * settings.gridSize);
      if (!snake.some(([sX, sY]) => sX === x && sY === y)) {
        return [x, y];
      }
    }
  }, [snake, settings.gridSize]);

  const generateBonus = useCallback((): Position => {
    while (true) {
      const x = Math.floor(Math.random() * settings.gridSize);
      const y = Math.floor(Math.random() * settings.gridSize);
      if (!snake.some(([sX, sY]) => sX === x && sY === y) && 
          !(food[0] === x && food[1] === y)) {
        return [x, y];
      }
    }
  }, [snake, food, settings.gridSize]);

  const checkCollision = (head: Position): boolean => {
    if (!settings.borderless) {
      if (head[0] < 0 || head[0] >= settings.gridSize || 
          head[1] < 0 || head[1] >= settings.gridSize) {
        return true;
      }
    }
    return snake.some(([x, y]) => x === head[0] && y === head[1]);
  };

  const wrapPosition = (pos: number): number => {
    if (pos < 0) return settings.gridSize - 1;
    if (pos >= settings.gridSize) return 0;
    return pos;
  };

  const moveSnake = useCallback(() => {
    if (isPaused) return;

    const head = snake[0];
    let newHead: Position;

    switch (direction) {
      case 'up':
        newHead = [head[0], settings.borderless ? wrapPosition(head[1] - 1) : head[1] - 1];
        break;
      case 'down':
        newHead = [head[0], settings.borderless ? wrapPosition(head[1] + 1) : head[1] + 1];
        break;
      case 'left':
        newHead = [settings.borderless ? wrapPosition(head[0] - 1) : head[0] - 1, head[1]];
        break;
      case 'right':
        newHead = [settings.borderless ? wrapPosition(head[0] + 1) : head[0] + 1, head[1]];
        break;
    }

    if (checkCollision(newHead)) {
      // Game Over
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('snakeHighScore', score.toString());
      }
      resetGame();
      return;
    }

    const newSnake = [newHead, ...snake];
    
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore(s => s + 10);
      setFood(generateFood());
      if (score > 0 && score % 50 === 0) {
        setBonus(generateBonus());
        setTimeout(() => setBonus(null), 5000);
        setDifficulty(Math.floor(score / 50) + 1);
      }
    } else if (bonus && newHead[0] === bonus[0] && newHead[1] === bonus[1]) {
      setScore(s => s + 50);
      setBonus(null);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, bonus, score, settings, isPaused]);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood(generateFood());
    setBonus(null);
    setDirection('right');
    setScore(0);
    setDifficulty(1);
    setIsPaused(false);
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, settings.speed - (difficulty * 5));
    return () => clearInterval(interval);
  }, [moveSnake, settings.speed, difficulty]);

  return {
    snake,
    food,
    bonus,
    score,
    highScore,
    direction,
    setDirection,
    resetGame,
    isPaused,
    setIsPaused,
    difficulty
  };
};