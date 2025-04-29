import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, X, ArrowRight, ChevronUp, Download } from 'lucide-react';

{/* Update the Preview Case Study buttons */}
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="btn-primary"
  onClick={() => setExpandedStudy(expandedStudy === index ? null : index)}
>
  {expandedStudy === index ? (
    <>
      Close Case Study
      <ChevronUp size={14} />
    </>
  ) : (
    <>
      Preview Case Study
      <Download size={14} />
    </>
  )}
</motion.button>