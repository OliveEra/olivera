import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 bg-slate-50/30 backdrop-blur-3xl -z-10">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        animate={{
          scale: [1, 1.2, 1],
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%'
          ],
          background: [
            'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(45deg, #4ecdc4, #45b7d1)',
            'linear-gradient(45deg, #45b7d1, #ff6b6b)',
          ],
        }}
        initial={{
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        style={{
          filter: 'blur(100px)',
          willChange: 'transform, border-radius',
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: '1000',
          WebkitTransform: 'translate3d(0,0,0)',
          WebkitTransformStyle: 'preserve-3d'
        }}
      />
    </div>
  );
};

export default Background;