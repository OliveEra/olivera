import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';

interface LookingProps {
  onShowResume: () => void;
}

const Looking: React.FC<LookingProps> = ({ onShowResume }) => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [eyes, setEyes] = useState<Array<{ id: number; x: number; y: number; caught: boolean; rotation: number }>>([]);
  const [gameOver, setGameOver] = useState(false);

  const spawnEye = useCallback(() => {
    if (!gameStarted) return;
    
    const newEye = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 40),
      y: Math.random() * (window.innerHeight - 40),
      caught: false,
      rotation: Math.random() * 360
    };

    setEyes(prev => [...prev, newEye]);

    setTimeout(() => {
      setEyes(prev => prev.filter(eye => eye.id !== newEye.id));
    }, 2000);
  }, [gameStarted]);

  const catchEye = (id: number) => {
    if (!gameStarted) return;

    setEyes(prev => prev.map(eye => 
      eye.id === id ? { ...eye, caught: true } : eye
    ));
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setEyes([]);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnInterval = setInterval(spawnEye, 1000);
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
  }, [gameStarted, gameOver, spawnEye]);

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex-grow flex flex-col items-center justify-center">
        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800">Third Eye Game</h2>
            <p className="text-lg text-gray-700">
              Open your third eye! Catch the mystical eyes before they vanish into another dimension. 
              How many can you collect in 30 seconds?
            </p>
            <div>
              <button
                onClick={startGame}
                className="btn-primary"
              >
                Start Game
              </button>
            </div>
          </motion.div>
        )}

        {gameStarted && (
          <div className="relative w-full h-[500px] bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <div className="text-xl font-bold text-gray-800">Score: {score}</div>
              <div className="text-xl font-bold text-gray-800">Time: {timeLeft}s</div>
            </div>

            {eyes.map(eye => !eye.caught && (
              <motion.div
                key={eye.id}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: eye.rotation,
                  transition: { duration: 0.5 }
                }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  position: 'absolute',
                  left: `${eye.x}px`,
                  top: `${eye.y}px`,
                  cursor: 'pointer'
                }}
                onClick={() => catchEye(eye.id)}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Eye size={32} className="filter drop-shadow-lg" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">Game Over!</h3>
            <p className="text-xl text-gray-700">Your third eye caught {score} mystical eyes!</p>
            <button
              onClick={startGame}
              className="btn-primary"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>

      <button
        onClick={onShowResume}
        className="btn-tertiary mt-8 justify-start"
      >
        About the creator
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Looking;