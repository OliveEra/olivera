import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Looking2: React.FC = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; caught: boolean; size: number }>>([]);
  const [gameOver, setGameOver] = useState(false);

  const spawnSparkle = useCallback(() => {
    if (!gameStarted) return;
    
    const newSparkle = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 40),
      y: Math.random() * (window.innerHeight - 40),
      caught: false,
      size: Math.random() * 16 + 16 // Random size between 16 and 32
    };

    setSparkles(prev => [...prev, newSparkle]);

    // Remove sparkle after 1.5 seconds if not caught
    setTimeout(() => {
      setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
    }, 1500);
  }, [gameStarted]);

  const catchSparkle = (id: number) => {
    if (!gameStarted) return;

    setSparkles(prev => prev.map(sparkle => 
      sparkle.id === id ? { ...sparkle, caught: true } : sparkle
    ));
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setSparkles([]);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnInterval = setInterval(spawnSparkle, 800);
      const timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameStarted(false);
            setGameOver(true);
            clearInterval(spawnInterval);
            clearInterval(timerInterval);
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
      };
    }
  }, [gameStarted, gameOver, spawnSparkle]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Sparkle Catcher</h2>
      
      {!gameStarted && !gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-700 mb-8">
            Catch the magical sparkles before they vanish! How many can you collect in 30 seconds?
          </p>
          <button
            onClick={startGame}
            className="btn-primary"
          >
            Start Game
          </button>
        </motion.div>
      )}

      {gameStarted && (
        <div className="relative w-full h-[500px] bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">Score: {score}</div>
            <div className="text-xl font-bold text-gray-800">Time: {timeLeft}s</div>
          </div>

          {sparkles.map(sparkle => !sparkle.caught && (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                position: 'absolute',
                left: `${sparkle.x}px`,
                top: `${sparkle.y}px`,
                cursor: 'pointer'
              }}
              onClick={() => catchSparkle(sparkle.id)}
              className="text-yellow-500"
            >
              <Sparkles 
                size={sparkle.size} 
                className="animate-pulse" 
              />
            </motion.div>
          ))}
        </div>
      )}

      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-800">Game Over!</h3>
          <p className="text-xl text-gray-700">You caught {score} sparkles!</p>
          <button
            onClick={startGame}
            className="btn-primary"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Looking2;