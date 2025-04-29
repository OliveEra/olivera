import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, LineChart as ChartLine, ArrowRight } from 'lucide-react';

interface PrinceCharmingProps {
  onShowResume: () => void;
}

const PrinceCharming: React.FC<PrinceCharmingProps> = ({ onShowResume }) => {
  return (
    <div className="h-full flex flex-col p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-start gap-3">
        <Crown className="text-gray-800 mt-1" />
        The Tale of the CRO Princess
      </h2>
      
      <div className="flex-grow overflow-y-auto pr-4 -mr-4">
        <div className="prose prose-lg text-gray-700 space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left"
          >
            Once upon a time, in a kingdom far beyond the digital realm, there lived a princess who was unlike any other. 
            While other princesses dreamed of their Prince Charming, this princess was enchanted by something far more 
            intriguing: the art of Conversion Rate Optimization.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Her castle wasn't adorned with traditional decorations, but rather with A/B test results, user flow diagrams, 
            and heat maps that sparkled like precious gems. Instead of dancing at royal balls, she spent her evenings 
            analyzing user behavior and optimizing customer journeys.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 my-8"
          >
            <Heart className="text-red-500" size={32} />
            <ChartLine className="text-blue-500" size={32} />
            <Heart className="text-red-500" size={32} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Many princes came from far and wide, hoping to win her heart with grand gestures and romantic promises. 
            But the princess was too busy increasing conversion rates and improving user experiences to notice. Her 
            true love was the satisfaction of seeing those conversion metrics climb higher and higher.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            "One day," the townspeople would whisper, "a prince will come who understands the value of user-centered design." 
            But the princess just smiled, knowing that her happily ever after wasn't about finding a prince - it was about 
            finding the perfect balance between user delight and business goals.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            And so, the CRO Princess continued her reign, turning digital experiences into gold, one optimization at a time. 
            She lived happily ever after, surrounded by the things she loved most: data-driven decisions, delighted users, 
            and conversion rates that went up, up, up into the stars.
          </motion.p>
        </div>
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

export default PrinceCharming;