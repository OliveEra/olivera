import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StudentProps {
  onShowResume: () => void;
}

const funFacts = [
  {
    title: "The Paradox of Choice",
    fact: "While we think having more options is better, studies show that too many choices can lead to decision paralysis and reduced satisfaction with our final choice.",
    source: "Barry Schwartz's research"
  },
  {
    title: "The Power of Social Proof",
    fact: "People are 63% more likely to purchase a product if it has user reviews, even if they don't read them.",
    source: "Nielsen Research"
  },
  {
    title: "Color Psychology",
    fact: "The color blue in interfaces can increase users' perception of trustworthiness by up to 15%.",
    source: "Color Psychology Studies"
  },
  {
    title: "The F-Pattern",
    fact: "Users typically scan web content in an F-shaped pattern, spending 80% of their time viewing the left half of the page.",
    source: "Nielsen Norman Group"
  },
  {
    title: "Decision Fatigue",
    fact: "The average adult makes about 35,000 decisions each day, leading to decision fatigue that affects user behavior on websites.",
    source: "Psychology Today"
  },
  {
    title: "The Rule of Seven",
    fact: "Users need to see a message at least seven times before it truly registers and prompts action, influencing how we design onboarding and marketing experiences.",
    source: "Marketing Psychology Research"
  }
];

const Student: React.FC<StudentProps> = ({ onShowResume }) => {
  return (
    <div className="h-full flex flex-col p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Fun Facts from UX Research</h2>
      
      <div className="flex-grow overflow-y-auto pr-4 -mr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {funFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">{fact.title}</h3>
              <p className="text-gray-700 mb-4">{fact.fact}</p>
              <p className="text-sm text-gray-500 italic">Source: {fact.source}</p>
            </motion.div>
          ))}
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

export default Student;