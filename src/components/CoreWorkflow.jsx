import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, ShieldAlert, Cpu, Sparkles, Presentation, FileCheck2, BarChart3, Star } from 'lucide-react';

const workflowSteps = [
  {
    phase: 'UPLOAD',
    title: 'Chapter PDF',
    desc: 'Teachers upload existing PDFs, textbooks, notes or slide resources.',
    icon: UploadCloud
  },
  {
    phase: 'UNDERSTAND',
    title: 'Concept Extraction',
    desc: 'AI parses definitions, dependencies, objectives, and structures.',
    icon: Cpu
  },
  {
    phase: 'CREATE',
    title: 'Resource Output',
    desc: 'Generate plans, tests, MCQs, answer keys, worksheets and presentations.',
    icon: Sparkles
  },
  {
    phase: 'TEACH',
    title: 'Classroom Delivery',
    desc: 'Use custom slideshow materials and lesson flows directly in class.',
    icon: Presentation
  },
  {
    phase: 'ASSESS',
    title: 'Student Evaluation',
    desc: 'Deploy interactive assessments, quizzes and subjective papers.',
    icon: FileCheck2
  },
  {
    phase: 'ANALYZE',
    title: 'Performance Diagnostics',
    desc: 'AI isolates specific concept errors across class sections.',
    icon: BarChart3
  },
  {
    phase: 'IMPROVE',
    title: 'Personalized Plans',
    desc: 'Automatically issue customized remediation timelines to weak students.',
    icon: Star
  }
];

export default function CoreWorkflow() {
  return (
    <section id="workflow" className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">PRODUCT CYCLE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
            One chapter. Everything you need.
          </h2>
          <p className="text-sm text-gray-500 font-medium max-w-xl">
            A single connected ecosystem taking your content from planning to student achievement.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical connecting line on mobile, Horizontal on desktop */}
          <div className="absolute top-12 left-6 bottom-12 w-0.5 bg-gray-100 lg:hidden" />
          <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-0.5 bg-gray-100" />

          {/* Workflow Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center group relative"
                >
                  {/* Step bubble marker */}
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center shadow-xs group-hover:border-indigo-600 transition-colors duration-300 relative z-10 mb-5">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
                  </div>

                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">
                    {step.phase}
                  </span>
                  
                  <h4 className="font-extrabold text-gray-900 text-sm mb-1.5">{step.title}</h4>
                  
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[150px] lg:mx-auto">
                    {step.desc}
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
