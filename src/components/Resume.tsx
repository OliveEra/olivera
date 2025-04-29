import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, ArrowRight, X, ChevronDown, Star, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SelectedWorks from './SelectedWorks';

interface ResumeProps {
  onClose: () => void;
  onShowPortfolio?: () => void;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
}

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex justify-between items-center"
      >
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <ChevronDown
          size={24}
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${star <= rating ? 'fill-gray-800' : 'fill-transparent'} text-gray-800`}
        />
      ))}
    </div>
  );
};

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
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
        className="relative bg-white rounded-xl overflow-hidden max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {certificate.imageUrl ? (
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full h-auto"
          />
        ) : (
          <div className="p-8 text-center text-gray-600">
            Certificate image not available
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

const Resume: React.FC<ResumeProps> = ({ onClose, onShowPortfolio }) => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [openSection, setOpenSection] = useState<string>('professional');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCvUrl = async () => {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl('CV.pdf');
      setCvUrl(publicUrl);
    };

    fetchCvUrl();
  }, []);

  const handleCvDownload = () => {
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handleShowPortfolio = () => {
    if (onShowPortfolio) {
      onShowPortfolio();
    } else {
      setShowPortfolio(true);
    }
  };

  const experience = [
    {
      title: "Product Designer",
      company: "Accolade, Inc",
      period: "2022 - Present",
      responsibilities: [
        "Led the redesign of core product features resulting in increased engagement and conversion rate",
        "Established and maintained comprehensive design system used across multiple products",
        "Implemented A/B testing methodologies to identify optimal website elements for maximizing conversion",
        "Collaborated with product managers and engineering teams to deliver major feature upgrades",
        "Improved product usability by conducting user research and implementing design changes based on feedback"
      ]
    },
    {
      title: "UX Design Lead",
      company: "Seracle.com",
      period: "2021 - 2022",
      responsibilities: [
        "Enhanced user experience by leading a team in designing for mobile app and it's website",
        "Designed and shipped mobile-first experiences for crypto-currency app",
        "Developed comprehensive design guidelines to maintain brand consistency across all digital platforms and marketing materials"
      ]
    },
    {
      title: "UX Designer",
      company: "GUS Global / Interactive Pro",
      period: "2019 - 2021",
      responsibilities: [
        "Developed and implemented design guidelines",
        "Analyzed web analytics data to inform design decisions and prioritize feature enhancements based on user behavior trends",
        "Collaborated with developers to ensure pixel-perfect implementation",
        "Presented UX designs and solutions to senior staff, evangelizing for user-centric design decisions",
        "Created interactive prototypes for user testing"
      ]
    },
    {
      title: "Front-end Developer",
      company: "Interactive Pro",
      period: "2018 - 2019",
      responsibilities: [
        "Utilized HTML, CSS, and JavaScript to create visually appealing and responsive web pages that met client requirements",
        "Worked closely with UX/UI designers to translate their designs into functional web applications",
        "Utilized version control systems such as Git to track changes throughout the development process"
      ]
    },
    {
      title: "Digital Specialist",
      company: "Wunderman",
      period: "2016 - 2018",
      responsibilities: [
        "Created and maintained websites for clients",
        "Coded emails, newsletters and creating digital assets",
        "Reported on the performance on the websites and emails"
      ]
    },
    {
      title: "Web Designer",
      company: "Freelancer",
      period: "2012 - 2016",
      responsibilities: [
        "Designed user interface to meet client specifications",
        "Designed and developed various websites from branding to live websites"
      ]
    }
  ];

  const certificates: Certificate[] = [
    {
      title: "UX management and strategy",
      issuer: "Interaction Design Foundation",
      date: "October 2020",
      imageUrl: "https://www.interaction-design.org/certificates/course/e73c1116-cb1c-4b25-a71d-715711badb97/large"
    },
    {
      title: "Conducting usability testing",
      issuer: "Interaction Design Foundation",
      date: "August 2020",
      imageUrl: "https://www.interaction-design.org/certificates/course/9a04ee75-9a82-4379-9421-86c7bebbe64f/large"
    },
    {
      title: "Web design certificate",
      issuer: "ITAcademy",
      date: "November 2011"
    }
  ];

  const skills = {
    design: [
      { name: "Design Systems", rating: 4 },
      { name: "Wireframing", rating: 5 },
      { name: "Prototyping", rating: 4 },
      { name: "User Research", rating: 4 },
      { name: "Conversion centric design", rating: 5 },
      { name: "Usability testing", rating: 5 }
    ],
    technical: [
      { name: "HTML/CSS", rating: 5 },
      { name: "A/B testing", rating: 5 }
    ],
    software: [
      { name: "Figma", rating: 5 },
      { name: "Adobe Photoshop / Illustrator", rating: 5 },
      { name: "GA4", rating: 4 },
      { name: "Hubspot", rating: 4 },
      { name: "Salesforce", rating: 3 },
      { name: "Mixpanel", rating: 4 },
      { name: "VWO", rating: 5 }
    ],
    languages: [
      { name: "English", rating: 5 },
      { name: "Italian", rating: 3 },
      { name: "Czech", rating: 3 }
    ]
  };

  const testimonials = [
    {
      author: "Marek Holub",
      role: "Global team lead for Microsoft",
      company: "Wunderman",
      content: "I've worked with Oli as her manager for over a year and she was one of the best employees I had the honor to hire. She's got very good attention to detail and always trying to go above and beyond to fulfill the client's wishes. Oli is not just following the brief, she's trying to understand what are the needs and goals of the client, adding an extra effort to deliver experience that the client will be ecstatic about. She's able to work independently by herself as well as being a team player and it's always fun to be around her. Oli has both deep technical knowledge and design thinking, which makes her great candidate for technical or UX/UI roles. She's a true professional, working hard and educating herself in her free time as well. If I could, I'd hire he again.",
      image: supabase.storage.from('images').getPublicUrl('marek-holub.jpg').data.publicUrl
    },
    {
      author: "Marek Holub",
      role: "Chief Product Officer",
      company: "Seracle",
      content: "Fun fact, Marek hired me again, this time as Queen of UX for Goku Market app, product of Seracle.",
      image: supabase.storage.from('images').getPublicUrl('marek-holub.jpg').data.publicUrl
    },
    {
      author: "Iva Gladysh Mirkovska",
      role: "Salesforce consultant",
      company: "Interactive Pro",
      content: "Creative coder with a passion for innovation. Oli is talented, educated, knowledgeable, intelligent and emphatic. There is no task she can't accomplish. Her ability to find a solution despite all the obstacles make her valuable, irreplaceable team player. I recommend Oli for any project that requires \"out of the box thinking\" yet structural approach. There is no Web page she can't code from the scratch :))",
      image: supabase.storage.from('images').getPublicUrl('ivana.jpeg').data.publicUrl
    }
  ];

  if (showPortfolio) {
    return (
      <div className="h-full">
        <SelectedWorks 
          onShowResume={() => setShowPortfolio(false)}
          hideHeader={false}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Resume</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <img
          src={supabase.storage.from('images').getPublicUrl('olioli.jpeg').data.publicUrl}
          alt="Olivera Tomich"
          className="w-24 h-24 rounded-full object-cover border-4 border-white/50"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">Olivera Tomich</h1>
          <p className="text-lg text-gray-600">Product Designer</p>
        </div>
      </div>

      <div className="flex-grow overflow-auto space-y-4">
        <Accordion
          title="Professional Summary"
          isOpen={openSection === 'professional'}
          onToggle={() => toggleSection('professional')}
        >
          <p className="text-gray-700 leading-relaxed">
            A seasoned Product Designer with over 8 years of experience in creating user-centered digital experiences. 
            Specialized in translating complex business requirements into intuitive interfaces that drive user engagement 
            and business growth. Proven track record of leading design teams and implementing successful design systems 
            that scale across multiple products.
          </p>
        </Accordion>

        <Accordion
          title="Work Experience"
          isOpen={openSection === 'experience'}
          onToggle={() => toggleSection('experience')}
        >
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-lg font-bold text-gray-800">{job.title}</h4>
                <p className="company-name text-gray-700">{job.company}</p>
                <p className="text-gray-600">{job.period}</p>
                {job.responsibilities.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i} className="text-gray-700">{responsibility}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion
          title="Skills & Languages"
          isOpen={openSection === 'skills'}
          onToggle={() => toggleSection('skills')}
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Design Skills</h4>
              <div className="space-y-2">
                {skills.design.map((skill) => (
                  <div key={skill.name} className="flex justify-between items-center">
                    <span className="text-gray-700">{skill.name}</span>
                    <SkillRating rating={skill.rating} />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Technical Skills</h4>
              <div className="space-y-2">
                {skills.technical.map((skill) => (
                  <div key={skill.name} className="flex justify-between items-center">
                    <span className="text-gray-700">{skill.name}</span>
                    <SkillRating rating={skill.rating} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Software</h4>
              <div className="space-y-2">
                {skills.software.map((software) => (
                  <div key={software.name} className="flex justify-between items-center">
                    <span className="text-gray-700">{software.name}</span>
                    <SkillRating rating={software.rating} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Languages</h4>
              <div className="space-y-2">
                {skills.languages.map((language) => (
                  <div key={language.name} className="flex justify-between items-center">
                    <span className="text-gray-700">{language.name}</span>
                    <SkillRating rating={language.rating} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Certificates"
          isOpen={openSection === 'certificates'}
          onToggle={() => toggleSection('certificates')}
        >
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md p-4 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setSelectedCertificate(cert)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      {cert.title}
                      {cert.imageUrl && <ExternalLink size={16} className="text-gray-500 hidden md:inline-block" />}
                    </h4>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Accordion>

        <Accordion
          title="People I've worked with"
          isOpen={openSection === 'testimonials'}
          onToggle={() => toggleSection('testimonials')}
        >
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-4 rounded-lg"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </Accordion>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button
          className="btn-primary"
          onClick={handleCvDownload}
        >
          Download CV
          <FileDown size={20} />
        </button>
        <button
          className="btn-tertiary"
          onClick={handleShowPortfolio}
        >
          See portfolio
          <ArrowRight size={20} />
        </button>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resume;