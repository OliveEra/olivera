import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Lock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GrowthProps {
  onShowSelectedWorks: () => void;
}

// LOCKED CONTENT: This array contains the core case studies that should not be modified
const CASE_STUDIES = [
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

const Growth: React.FC<GrowthProps> = ({ onShowSelectedWorks }) => {
  const [expandedWork, setExpandedWork] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        I'd love to help you grow!
      </h2>
      
      <div className="mb-12">
        <p className="text-lg text-gray-700 mb-8">
          With over 8 years of experience in product design and CRO, I help businesses optimize their digital products, 
          reduce marketing costs, and achieve sustainable growth through data-driven design decisions and systematic testing.
        </p>
        
        <a
          href="http://linkedin.com/in/oliverka"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex"
        >
          Message me on LinkedIn
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="space-y-6 flex-grow overflow-y-auto">
        {CASE_STUDIES.map((study, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20"
          >
            <div className="relative aspect-[2/1]">
              <img
                src={study.mainImage}
                alt={study.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {study.categories.map((category) => (
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
                {study.title}
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
                      {Object.entries(study.details).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-gray-800 font-bold capitalize text-sm">{key}</span>
                          <span className="text-gray-600 text-sm -mt-0.5">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">The Challenge</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>

                    {study.results && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Results</h4>
                        <ul className="space-y-2">
                          {study.results.map((result, i) => (
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

                    {study.solution && (
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
                            {study.solution}
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

      <button
        onClick={onShowSelectedWorks}
        className="btn-tertiary mt-12 justify-start"
      >
        See more projects
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Growth;