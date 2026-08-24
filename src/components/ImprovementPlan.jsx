import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Layers, MessageSquare, Briefcase, Award, Sparkles } from 'lucide-react';

const schedule = [
  {
    day: 'DAY 01',
    title: 'MongoDB Indexing',
    subtitle: '10 practice questions',
    description: 'Master compound indexes, explain plans, and identify query bottleneck patterns.',
    icon: BookOpen,
  },
  {
    day: 'DAY 02',
    title: 'Aggregation Pipeline',
    subtitle: 'Coding challenge',
    description: 'Solve complex stages ($lookup, $facet, $unwind) and optimize pipeline execution.',
    icon: Code,
  },
  {
    day: 'DAY 03',
    title: 'System Design',
    subtitle: 'Mini architecture exercise',
    description: 'Design highly available write-heavy APIs and configure cache-aside caching layers.',
    icon: Layers,
  },
  {
    day: 'DAY 04',
    title: 'Mock Interview',
    subtitle: 'Real-time adaptive testing',
    description: 'Evaluate your MongoDB query optimizations under time limits with voice guidance.',
    icon: MessageSquare,
  },
  {
    day: 'DAY 05',
    title: 'Project Deep Dive',
    subtitle: 'Schema normalization audit',
    description: 'Review database design structures and outline document schema decisions.',
    icon: Briefcase,
  },
  {
    day: 'DAY 06',
    title: 'Weak Area Revision',
    subtitle: 'Targeted flashcard drill',
    description: 'Address minor theoretical gaps flagged during mock evaluations in early steps.',
    icon: Award,
  },
  {
    day: 'DAY 07',
    title: 'Final AI Interview',
    subtitle: 'Exit verification',
    description: 'A comprehensive voice interview checking normalized skills to sign off your status.',
    icon: Sparkles,
  },
];

export default function ImprovementPlan() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">REMEDIAL PATH</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Turn weak areas into a plan.
          </h2>
        </div>

        {/* Timeline Content Card */}
        <div className="max-w-3xl mx-auto bg-[#FAFAFA] border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm relative text-left">
          <div className="border-b border-gray-200/60 pb-5 mb-8 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Your 7-Day Improvement Plan</h3>
              <p className="text-xs text-gray-400 font-medium">Custom generated for MongoDB & System Design gaps</p>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Automated Output
            </span>
          </div>

          {/* Timeline */}
          <div className="relative border-l border-gray-200 pl-6 sm:pl-8 space-y-10 ml-2">
            {schedule.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative group"
                >
                  {/* Outer circle marker */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-indigo-600 transition-colors duration-200 z-10 shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
                  </div>

                  {/* Card wrapper */}
                  <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow transition-shadow duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded tracking-wide">
                          {item.day}
                        </span>
                        <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                      </div>
                      <span className="text-xs text-gray-400 font-medium sm:text-right mt-1 sm:mt-0">
                        {item.subtitle}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
