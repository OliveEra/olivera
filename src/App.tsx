import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import Dropdown from './components/Dropdown';
import SelectedWorks from './components/SelectedWorks';
import Resume from './components/Resume';
import Growth from './components/Growth';
import Student from './components/Student';
import Looking from './components/Looking';
import PrinceCharming from './components/PrinceCharming';
import Logo from './components/Logo';

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selection, setSelection] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showResumeSection, setShowResumeSection] = useState(false);
  const [showSelectedWorks, setShowSelectedWorks] = useState(false);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showLooking, setShowLooking] = useState(false);
  const [showPrinceCharming, setShowPrinceCharming] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const options = [
    'a recruiter',
    'a hiring manager',
    'a product owner',
    'a student',
    'just looking',
    'prince charming'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typewriterComplete) {
      setShowDropdown(true);
    }
  }, [typewriterComplete]);

  useEffect(() => {
    const handleSelection = () => {
      setShowResumeSection(false);
      setShowSelectedWorks(false);
      setShowGrowth(false);
      setShowStudent(false);
      setShowLooking(false);
      setShowPrinceCharming(false);

      switch (selection) {
        case 'a recruiter':
          setShowResumeSection(true);
          break;
        case 'a hiring manager':
          setShowSelectedWorks(true);
          break;
        case 'a product owner':
          setShowGrowth(true);
          break;
        case 'a student':
          setShowStudent(true);
          break;
        case 'just looking':
          setShowLooking(true);
          break;
        case 'prince charming':
          setShowPrinceCharming(true);
          break;
      }

      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    if (selection) {
      handleSelection();
    }
  }, [selection]);

  const handleShowResume = () => {
    setShowResumeSection(true);
    setShowSelectedWorks(false);
    setShowGrowth(false);
    setShowStudent(false);
    setShowLooking(false);
    setShowPrinceCharming(false);
    scrollToTop();
  };

  const handleShowSelectedWorks = () => {
    setShowResumeSection(false);
    setShowGrowth(false);
    setShowSelectedWorks(true);
    scrollToTop();
  };

  return (
    <div className="min-h-screen w-full">
      <Background />
      <Logo />
      
      <div className="min-h-screen md:container md:mx-auto lg:grid lg:grid-cols-5 lg:gap-8 px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-[100px] px-4 md:pt-8 md:h-screen md:flex md:items-center lg:col-span-2"
        >
          <div className="max-w-2xl">
            <div className="welcome-text mb-8">
              <Typewriter
                options={{
                  delay: 50,
                  cursor: '|',
                  wrapperClassName: 'welcome-text'
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Hi, I am Oli - experienced Product designer.')
                    .pauseFor(500)
                    .typeString(' I blend data-driven insights with intuitive design to craft products that not only look great but also perform.')
                    .pauseFor(300)
                    .callFunction(() => setTypewriterComplete(true))
                    .start();
                }}
              />
            </div>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-4"
              >
                <span className="welcome-text font-bold text-gray-800">And you are</span>
                <Dropdown
                  options={options}
                  value={selection}
                  onChange={setSelection}
                  className="welcome-text"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {selection && (
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mt-8 md:mt-0 lg:h-screen lg:flex lg:items-center lg:col-span-3"
            >
              <div className="w-full h-full bg-[#efefef]/20 backdrop-blur-2xl rounded-2xl">
                {showResumeSection && <Resume onClose={() => setShowResumeSection(false)} onShowPortfolio={handleShowSelectedWorks} />}
                {showSelectedWorks && <SelectedWorks onShowResume={handleShowResume} />}
                {showGrowth && <Growth onShowSelectedWorks={handleShowSelectedWorks} />}
                {showStudent && <Student onShowResume={handleShowResume} />}
                {showLooking && <Looking onShowResume={handleShowResume} />}
                {showPrinceCharming && <PrinceCharming onShowResume={handleShowResume} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;