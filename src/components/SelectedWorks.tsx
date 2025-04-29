import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, X, ChevronLeft, ChevronRight, Lock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SelectedWorksProps {
  onShowResume?: () => void;
  hideHeader?: boolean;
}

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  descriptions?: string[];
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onNext, onPrev, descriptions }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="relative max-w-6xl w-full bg-white rounded-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="max-h-[500px] flex items-center justify-center bg-white/5">
          <img
            src={images[currentIndex]}
            alt={`Project detail ${currentIndex + 1}`}
            className="max-h-[500px] w-auto object-contain"
          />
        </div>
        {descriptions && descriptions[currentIndex] && (
          <div className="p-6 bg-white">
            <p className="text-gray-800 text-lg">{descriptions[currentIndex]}</p>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} className={currentIndex === 0 ? 'text-gray-400' : 'text-gray-800'} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight size={24} className={currentIndex === images.length - 1 ? 'text-gray-400' : 'text-gray-800'} />
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
        >
          <X size={24} />
        </button>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  );
};

// LOCKED CONTENT: This array contains the core portfolio works that should not be modified
const PORTFOLIO_WORKS = [
  {
    title: "Marketing websites design system",
    categories: ["Design System", "UX"],
    mainImage: supabase.storage.from('portfolio').getPublicUrl('ads.png').data.publicUrl,
    details: {
      product: "Website",
      source: "Organic & Paid traffic",
      tools: "Figma, Hubspot"
    },
    challenge: "Redesign 3 marketing websites focused on conversion that will use the same components.",
    images: [
      supabase.storage.from('portfolio').getPublicUrl('portfolio1.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('portfolio2.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('portfolio3.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('portfolio4.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('portfolio5.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('portfolio6.png').data.publicUrl
    ],
    imageDescriptions: [
      "Hero component",
      "Cards and testimonial components",
      "Variations of Cards components",
      "Interactive tabs component",
      "Form components",
      "Navigation components"
    ]
  },
  {
    title: "Form experiments that brought us 35,6% uplift in conversion",
    categories: ["CRO", "Case Study"],
    mainImage: supabase.storage.from('portfolio').getPublicUrl('lsbf-cover.png').data.publicUrl,
    details: {
      product: "Landing page",
      source: "Paid ads",
      goal: "Increase form submissions",
      tools: "VWO, Google Analytics, Clearbit, Pardot"
    },
    challenge: "Use all weapons we have in our army to optimise the form for lead generation.",
    results: [
      { text: "35,6% increase of form submits", type: "increase" },
      { text: "9,9% decrease of time to submit", type: "decrease" }
    ],
    solution: "Our form analytics revealed friction in the conversion process, with users abandoning due to lengthy input requirements. To streamline the experience, we reduced unnecessary form fields and implemented automatic location detection, eliminating manual entry. This optimization led to a shorter time to convert, improved user experience, and a higher conversion rate. A/B testing confirmed that users completed the form more efficiently, reducing frustration and increasing submissions. This case highlights how small yet strategic form improvements can remove barriers, enhance usability, and drive measurable CRO impact."
  },
  {
    title: "Redesigning the Hero section with 23,5% uplift in conversion",
    categories: ["CRO", "Design", "Case Study"],
    mainImage: supabase.storage.from('portfolio').getPublicUrl('herogero.png').data.publicUrl,
    details: {
      product: "Landing page",
      source: "Paid search",
      goal: "Booking appointment",
      tools: "Mixpanel, Hubspot, FullStory, Figma"
    },
    challenge: "Our original hero section struggled to drive engagement, resulting with low conversion rate",
    results: [
      { text: "23,5% increase of conversion", type: "increase" },
      { text: "34,8% decrease of bounce rate", type: "decrease" }
    ],
    solution: "Through in-depth research using heatmaps, scroll maps, and time-on-page analysis, we identified key friction points in our hero section. Users were either missing the CTA or dropping off too soon, indicating a need for clearer messaging and improved visual hierarchy. Based on these insights, we developed a new hero section with a stronger value proposition, better CTA placement, and reduced distractions. A/B testing validated our approach, leading to a 33.5% increase in conversions. This result highlights the power of data-driven design in optimizing user experience and driving meaningful business impact."
  },
  {
    title: "25% uplift by personalising University study requirements",
    categories: ["CRO", "Case Study"],
    mainImage: supabase.storage.from('portfolio').getPublicUrl('arden-cover.png').data.publicUrl,
    details: {
      case: "Landing page",
      source: "Display Ads",
      goal: "Lead generation",
      tools: "VWO, Google Analytics"
    },
    challenge: "Our landing page was struggling with perfomance for African market",
    results: [
      { text: "25% increase of conversion", type: "increase" },
      { text: "12% decrease of bounce rate", type: "decrease" }
    ],
    solution: "The university has different requirements for level of knowledge of English language depending on the country of origin of the student. By leveraging geolocation data, we ensured visitors saw only the relevant requirements, streamlining their decision-making process. A/B testing confirmed a 25% increase in form submissions and a 12% reduction in bounce rate. This approach not only improved user experience but also aligned with our CRO strategy—removing friction and guiding users toward conversion with clearer, more relevant information."
  },
  {
    title: "Redesign of crypto mobile and web app",
    categories: ["UX Design", "Design System"],
    mainImage: supabase.storage.from('portfolio').getPublicUrl('goku-cover.png').data.publicUrl,
    details: {
      product: "Web & app",
      tools: "Figma"
    },
    challenge: "Redesign existing web app and prepare it for a new branding with new design system",
    images: [
      supabase.storage.from('portfolio').getPublicUrl('goku-web-1.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('goku-mobile-web-2.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('goku-web-portfolio.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('goku-portfolio-mobile.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('Login1.png').data.publicUrl,
      supabase.storage.from('portfolio').getPublicUrl('login-mobile.png').data.publicUrl
    ],
    imageDescriptions: [
      "Web dashboard with improved navigation and data visualization",
      "Mobile app interface optimized for quick transactions",
      "Portfolio management view with real-time updates",
      "Mobile portfolio tracking with customizable widgets",
      "Streamlined web login experience",
      "Mobile-first authentication flow"
    ]
  },
  {
    title: "Usability test before implementing new feature",
    categories: ["Case Study", "Usability test", "UX"],
    mainImage: supabase.storage.from('portfolio').getPublicUrl('user-testing.png').data.publicUrl,
    details: {
      product: "Healthcare platform",
      tools: "Figma, UserTesting"
    },
    challenge: "Simplify the process of how our Health assistant will support out member during their call",
    solution: "Working close with design and research team to prepare high fidelity prototypes of new flow change in our platform. Considering our two user groups, we decided to do unmoderated test with our Health assitants and collect their feedback and to use one of our tools to conduct unmoderated usability testing with our members."
  },
  {
    title: "Designing new features to support the sales funnel",
    categories: ["CRO", "Design", "Case Study"],
    mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    details: {
      product: "Website",
      source: "Paid ads",
      goal: "Sign up for course",
      tools: "VWO, Google Analytics"
    },
    challenge: "Support the conversion rate by sending qualified leads into the funnel",
    results: [
      { text: "19,6% increase of the end conversion", type: "increase" },
      { text: "23% decrease of drop-off rate", type: "decrease" }
    ],
    solution: "We observed a drop in conversions at the final step of our three-step funnel, despite a significant increase in entries at step two. This indicated that unqualified users were progressing through the funnel but failing to convert. To address this, we introduced an additional category filter before users entered the funnel, ensuring only relevant leads moved forward. As a result, we attracted more qualified users, reducing drop-offs in the final step and ultimately boosting the overall conversion rate. This optimization reinforced the importance of pre-funnel segmentation in driving higher-quality conversions."
  }
];

const SelectedWorks: React.FC<SelectedWorksProps> = ({ onShowResume, hideHeader = false }) => {
  const [expandedWork, setExpandedWork] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentWorkIndex, setCurrentWorkIndex] = useState<number | null>(null);

  const handleImageClick = (workIndex: number, imageIndex: number) => {
    setCurrentWorkIndex(workIndex);
    setSelectedImageIndex(imageIndex);
  };

  const handleNextImage = () => {
    if (currentWorkIndex === null || selectedImageIndex === null) return;
    const maxIndex = PORTFOLIO_WORKS[currentWorkIndex].images?.length - 1;
    if (maxIndex === undefined) return;
    setSelectedImageIndex(selectedImageIndex < maxIndex ? selectedImageIndex + 1 : selectedImageIndex);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : selectedImageIndex);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'Escape') {
      setSelectedImageIndex(null);
      setCurrentWorkIndex(null);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex, currentWorkIndex]);

  return (
    <div className="h-full flex flex-col p-4 md:p-8">
      {!hideHeader && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">Selected Works</h2>
          </div>
          <p className="text-lg text-gray-700 mb-12">
            Blending design, data, and psychology to create high-performing digital experiences that drive engagement and conversions.
          </p>
        </>
      )}

      <div className="space-y-6 flex-grow overflow-y-auto pr-4 -mr-4">
        {PORTFOLIO_WORKS.map((work, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20"
          >
            <div className="relative aspect-[2/1]">
              <img
                src={work.mainImage}
                alt={work.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {work.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-800"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {work.title}
              </h3>

              <AnimatePresence>
                {expandedWork === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {Object.entries(work.details).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-gray-800 font-bold capitalize text-sm">{key}</span>
                          <span className="text-gray-600 text-sm -mt-0.5">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">The Challenge</h4>
                      <p className="text-gray-700">{work.challenge}</p>
                    </div>

                    {work.results && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Results</h4>
                        <ul className="space-y-2">
                          {work.results.map((result, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700">
                              {result.type === 'increase' ? (
                                <ArrowUpRight className="text-green-600" size={20} />
                              ) : (
                                <ArrowDownRight className="text-red-600" size={20} />
                              )}
                              {result.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {work.solution && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">The Solution</h4>
                        <div className="relative">
                          <div 
                            className="text-gray-700 overflow-hidden" 
                            style={{
                              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
                              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
                              height: '120px'
                            }}
                          >
                            {work.solution}
                          </div>
                          <div className="mt-6">
                            <div className="border-3 border-gray-800 rounded-lg py-8 px-6 mb-4">
                              <Lock className="mx-auto mb-4" size={24} />
                              <p className="text-sm text-gray-800 text-center">
                                This case study is protected by NDA, but I would be happy to discuss it in person.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {work.images && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {work.images.map((image, i) => (
                          <motion.div
                            key={i}
                            className="relative cursor-pointer overflow-hidden rounded-lg group aspect-[4/3]"
                            onClick={() => handleImageClick(index, i)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img
                              src={image}
                              alt={work.imageDescriptions?.[i] || `Project image ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-sm font-medium">View larger</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setExpandedWork(expandedWork === index ? null : index)}
                className="btn-tertiary mt-4 justify-start"
              >
                {expandedWork === index ? (
                  <>
                    Show less
                    <ChevronUp size={20} />
                  </>
                ) : (
                  <>
                    Show more
                    <ChevronDown size={20} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {onShowResume && (
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <a
            href="http://linkedin.com/in/oliverka"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Message me on LinkedIn
            <ArrowRight size={16} />
          </a>
          <button
            onClick={onShowResume}
            className="btn-tertiary"
          >
            See my resume
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedImageIndex !== null && currentWorkIndex !== null && PORTFOLIO_WORKS[currentWorkIndex].images && (
          <ImageModal
            images={PORTFOLIO_WORKS[currentWorkIndex].images}
            currentIndex={selectedImageIndex}
            onClose={() => {
              setSelectedImageIndex(null);
              setCurrentWorkIndex(null);
            }}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            descriptions={PORTFOLIO_WORKS[currentWorkIndex].imageDescriptions}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectedWorks;