import { useCallback, useRef } from 'react';

export const useSound = (enabled: boolean) => {
  const eatSound = useRef(new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'));
  const gameOverSound = useRef(new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'));

  const playEatSound = useCallback(() => {
    if (enabled) {
      eatSound.current.currentTime = 0;
      eatSound.current.play();
    }
  }, [enabled]);

  const playGameOverSound = useCallback(() => {
    if (enabled) {
      gameOverSound.current.currentTime = 0;
      gameOverSound.current.play();
    }
  }, [enabled]);

  const toggleSound = useCallback(() => {
    return enabled;
  }, [enabled]);

  return {
    playEatSound,
    playGameOverSound,
    toggleSound
  };
};