import React, { useEffect, useRef, useState } from 'react';
import { Settings, Play, Pause, Trophy, Volume2, VolumeX, ArrowLeft, X } from 'lucide-react';
import { useGameLogic } from '../hooks/useGameLogic';
import { useSound } from '../hooks/useSound';

const GRID_SIZE = 20;

export const Game = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [settings, setSettings] = useState({
    speed: 100,
    gridSize: GRID_SIZE,
    borderless: false,
    soundEnabled: true,
  });
  
  const { 
    snake, 
    food, 
    bonus,
    score,
    highScore,
    direction,
    setDirection,
    resetGame,
    updateGame,
    isPaused,
    setIsPaused,
    difficulty
  } = useGameLogic(settings);

  const { playEatSound, playGameOverSound, toggleSound } = useSound(settings.soundEnabled);
  
  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameState !== 'playing') return;
    
    switch(e.key) {
      case 'ArrowUp':
        if (direction !== 'down') setDirection('up');
        break;
      case 'ArrowDown':
        if (direction !== 'up') setDirection('down');
        break;
      case 'ArrowLeft':
        if (direction !== 'right') setDirection('left');
        break;
      case 'ArrowRight':
        if (direction !== 'left') setDirection('right');
        break;
      case ' ':
        setIsPaused(!isPaused);
        break;
      case 'Escape':
        handleExit();
        break;
    }
  };

  const handleExit = () => {
    setIsPaused(true);
    if (window.confirm('Do you really want to quit the game?')) {
      setGameState('menu');
      resetGame();
    } else {
      setIsPaused(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameState, isPaused]);

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some(([sX, sY]) => sX === x && sY === y);
    const isFood = food[0] === x && food[1] === y;
    const isBonus = bonus && bonus[0] === x && bonus[1] === y;

    return (
      <div
        key={`${x}-${y}`}
        className={`w-5 h-5 border border-gray-200 ${
          isSnake ? 'bg-green-500' :
          isFood ? 'bg-red-500' :
          isBonus ? 'bg-yellow-400 animate-pulse' :
          'bg-white'
        }`}
      />
    );
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        row.push(renderCell(x, y));
      }
      grid.push(
        <div key={y} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  };

  const renderMenu = () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setGameState('playing')}
        className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
      >
        <Play size={20} /> Play
      </button>
      <button
        onClick={() => setGameState('settings')}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Settings size={20} /> Settings
      </button>
      <button
        onClick={() => setGameState('highscores')}
        className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
      >
        <Trophy size={20} /> High Scores
      </button>
    </div>
  );

  const renderGame = () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full px-4 py-2 bg-gray-100 rounded-lg">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
        <div>Level: {difficulty}</div>
      </div>
      <div className="border-2 border-gray-300 rounded-lg p-1 bg-white">
        {renderGrid()}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={() => toggleSound()}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          Sound
        </button>
        <button
          onClick={handleExit}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <X size={20} />
          Quit
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Initial Speed
          </label>
          <input
            type="range"
            min="50"
            max="200"
            value={settings.speed}
            onChange={(e) => setSettings({...settings, speed: Number(e.target.value)})}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Borderless Mode
          </label>
          <input
            type="checkbox"
            checked={settings.borderless}
            onChange={(e) => setSettings({...settings, borderless: e.target.checked})}
            className="ml-2"
          />
        </div>
        <button
          onClick={() => setGameState('menu')}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 justify-center"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </button>
      </div>
    </div>
  );

  const renderHighScores = () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center">High Scores</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-xl text-center">Current Record: {highScore}</p>
      </div>
      <button
        onClick={() => setGameState('menu')}
        className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 justify-center"
      >
        <ArrowLeft size={20} />
        Back to Menu
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-600">Snake Game</h1>
        {gameState === 'menu' && renderMenu()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'settings' && renderSettings()}
        {gameState === 'highscores' && renderHighScores()}
      </div>
    </div>
  );
};