# 🐍 Modern Snake Game

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A modern implementation of the classic Snake game built with React and TypeScript. This project features a sleek, responsive design and modern gaming mechanics.

## ✨ Key Features

- 🎮 Smooth, responsive gameplay
- 📈 Progressive difficulty system
- 🏆 High score tracking with localStorage
- ⚙️ Customizable game settings
- 🎵 Sound effects
- 🎯 Special bonus items
- 🔄 Multiple game states (menu, playing, paused, game over)
- 🛡️ Borderless mode option

## 🛠️ Technologies Used

- React 18.3
- TypeScript 5.5
- Tailwind CSS 3.4
- Vite
- Lucide React (for icons)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/modern-snake-game.git
cd modern-snake-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🎮 How to Play

- Use arrow keys to control the snake's direction
- Collect red food items to grow and score points
- Yellow bonus items appear periodically for extra points
- Press Space to pause/resume the game
- Press Escape to quit the current game

## 🔧 Configuration

The game can be customized through the settings menu:

```typescript
interface GameSettings {
  speed: number;        // Initial game speed (50-200)
  gridSize: number;     // Size of the game grid
  borderless: boolean;  // Enable/disable wall collisions
  soundEnabled: boolean; // Toggle sound effects
}
```

## 🎯 Game Logic Example

```typescript
// Movement control
const handleKeyPress = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'ArrowUp':
      if (direction !== 'down') setDirection('up');
      break;
    case 'ArrowDown':
      if (direction !== 'up') setDirection('down');
      break;
    // ... other directions
  }
};

// Score system
const handleFoodCollection = () => {
  setScore(score + 10);
  if (score > 0 && score % 50 === 0) {
    spawnBonus();
    increaseDifficulty();
  }
};
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📧 Contact

Mail - jchouinato@gmail.com

---

Made with ❤️ using React and TypeScript
