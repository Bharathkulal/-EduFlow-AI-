import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Compass, Video, TrendingUp } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Upload',
    subtitle: 'Resume + Projects',
    description: 'Provide your resume, projects/GitHub metadata, and optionally a target job description.',
    icon: UploadCloud,
  },
  {
    step: '02',
    title: 'Understand',
    subtitle: 'Skill Mapping',
    description: 'Verity parses your codebase artifacts, maps your actual skills, and flags immediate knowledge gaps.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Interview',
    subtitle: 'Adaptive Session',
    description: 'Conduct a voice interview where questions dynamically adjust based on your previous answers.',
    icon: Video,
  },
  {
    step: '04',
    title: 'Improve',
    subtitle: 'Actionable Plan',
    description: 'Receive an evaluation report alongside a personalized, step-by-step 7-day refinement schedule.',
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1, ease: 'easeInOut', delay: 0.4 } 
    }
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">WORKFLOW</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            A clean pathway to verification.
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Horizontal connecting line (Desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gray-100 z-0">
            <motion.div 
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-indigo-500 h-full origin-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center group"
                >
                  {/* Step Indicator / Icon container */}
                  <div className="relative mb-6 flex lg:justify-center w-full">
                    {/* Vertical connecting line for mobile */}
                    {idx < steps.length - 1 && (
                      <div className="lg:hidden absolute top-12 left-6 bottom-[-48px] w-0.5 bg-gray-100" />
                    )}

                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm group-hover:border-indigo-600 transition-colors duration-300 relative z-10">
                      <Icon className="w-5 h-5 text-gray-700 group-hover:text-indigo-600 transition-colors duration-300" />
                    </div>
                  </div>

                  <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1.5">
                    Step {step.step}
                  </span>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
