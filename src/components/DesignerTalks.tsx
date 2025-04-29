import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight } from 'lucide-react';

interface DesignerTalksProps {
  onClose: () => void;
}

const DesignerTalks: React.FC<DesignerTalksProps> = ({ onClose }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    message: ''
  });

  const topics = [
    {
      title: "Design Systems",
      description: "Let's discuss building and maintaining scalable design systems"
    },
    {
      title: "User Research",
      description: "Share experiences about user research methodologies"
    },
    {
      title: "Accessibility",
      description: "Explore inclusive design practices and WCAG guidelines"
    },
    {
      title: "Let's talk about design",
      description: "Open discussion about design trends and challenges",
      triggersForm: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to your backend
    window.location.href = `mailto:Oletomich@gmail.com?subject=Design Discussion Request&body=Name: ${formData.name}%0D%0ALocation: ${formData.location}%0D%0AMessage: ${formData.message}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 md:text-2xl">Design Topics</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Close designer talks"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => topic.triggersForm && setShowContactForm(true)}
            className="p-6 bg-white/10 backdrop-blur-md rounded-xl text-left hover:bg-white/20 transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
            <p className="text-gray-700">{topic.description}</p>
            {topic.triggersForm && (
              <div className="mt-4 inline-flex items-center gap-2 text-gray-800 font-bold">
                Start conversation
                <ArrowRight size={20} />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Let's Connect</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/50 backdrop-blur-md rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/50 backdrop-blur-md rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/50 backdrop-blur-md rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/50 backdrop-blur-md rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg text-lg font-bold transition-colors hover:bg-gray-700"
              >
                Send
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignerTalks;