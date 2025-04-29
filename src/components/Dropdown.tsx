import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, className }) => {
  return (
    <div className="relative inline-block">
      <motion.select
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`appearance-none bg-transparent border-b-3 border-gray-400 hover:border-gray-600 focus:border-gray-800 
          px-2 py-1 pr-8 text-gray-800 outline-none transition-colors cursor-pointer
          font-bold whitespace-normal ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled></option>
        {options.map((option) => (
          <option key={option} value={option} className="text-gray-800 bg-[#efefef]/20 backdrop-blur-2xl">
            {option}
          </option>
        ))}
      </motion.select>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: value ? 0 : [0, 4, 0] }}
        transition={{
          duration: 0.8,
          repeat: value ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className="absolute right-0 top-[20%] pointer-events-none"
      >
        <ChevronDown className="text-gray-600" size={36} />
      </motion.div>
    </div>
  );
};

export default Dropdown;