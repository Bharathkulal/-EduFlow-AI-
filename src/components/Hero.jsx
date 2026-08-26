import React from 'react';
import { motion } from 'react';
import { motion as motionElement } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, ChevronRight, Check } from 'lucide-react';

export default function Hero({ setView }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 100 } 
    },
  };

  const outputs = [
    'Lesson Plan', 'Question Paper', 'Quiz',
    'PPT', 'Worksheet', 'Homework',
    "Bloom's", 'Answer Key', 'Translate'
  ];

  return (
    <section id="hero-section" className="relative bg-white lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.04),rgba(255,255,255,0))]" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left: Text CTAs */}
          <motionElement.div 
            className="lg:col-span-5 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motionElement.div variants={itemVariants} className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One Platform. Connected Workflow.</span>
            </motionElement.div>

            <motionElement.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold tracking-tight text-gray-900 leading-[1.15] mb-6"
            >
              From One Chapter <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
                to an Entire Teaching Workflow.
              </span>
            </motionElement.h1>

            <motionElement.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed mb-8 max-w-xl"
            >
              Upload a chapter or PDF and let AI create lesson plans, assessments, presentations, worksheets, homework and more — then analyze student performance and build personalized learning plans.
            </motionElement.p>

            <motionElement.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4"
            >
              <button 
                onClick={() => setView('login')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 group cursor-pointer"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#workflow"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl shadow-sm transition-all duration-200"
              >
                See How It Works
              </a>
            </motionElement.div>

            <motionElement.p 
              variants={itemVariants}
              className="text-xs text-gray-400"
            >
              Create less. Teach better. Understand your students.
            </motionElement.p>
          </motionElement.div>

          {/* Right: Mockup Dashboard Visual */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end xl:pr-4">
            <div className="absolute w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-20 -z-10" />

            <motionElement.div 
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 80, delay: 0.2 }}
              className="w-full max-w-[580px] lg:max-w-[620px] xl:max-w-[650px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl p-5 sm:p-6 space-y-6 text-left"
            >
              {/* Box 1: Chapter Upload */}
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Chapter Source</span>
                    <h4 className="text-sm font-bold text-gray-900">DBMS Normalization.pdf</h4>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50">
                  <Check className="w-3.5 h-3.5" />
                  <span>AI Analyzed</span>
                </div>
              </div>

              {/* Box 2: Generating Grid */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">AI TEACHING HUB GENERATIONS</span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {outputs.map((name, idx) => (
                    <motionElement.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 + 0.5 }}
                      className="bg-white border border-gray-100 rounded-lg p-2 sm:p-3 text-center shadow-xs flex flex-col items-center justify-center hover:border-indigo-600/30 transition-all duration-200"
                    >
                      <span className="text-[11px] font-bold text-gray-800">{name}</span>
                      <span className="text-[9px] text-emerald-500 font-semibold mt-1">Ready</span>
                    </motionElement.div>
                  ))}
                </div>
              </div>

              {/* Box 3: Student Insights Panel (Connected cycle) */}
              <div className="border-t border-gray-100 pt-5">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-3">STUDENT PERFORMANCE INSIGHTS</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Left: Score bar */}
                  <div className="sm:col-span-5 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-gray-700">
                      <span>Class Performance</span>
                      <span className="text-gray-900">84%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '84%' }} />
                    </div>
                  </div>

                  {/* Middle divider */}
                  <div className="hidden sm:flex sm:col-span-1 justify-center text-gray-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  {/* Right: Weak topic / action card */}
                  <div className="sm:col-span-6 bg-indigo-50/50 border border-indigo-100/50 rounded-xl p-3 text-xs">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="font-bold text-rose-600">Weak Topic:</span>
                      <span className="font-semibold text-gray-700">Normalization Anomalies</span>
                    </div>
                    <p className="text-[11px] text-indigo-950 font-bold leading-relaxed">
                      AI Action: "Assign 10 application-level questions to weak cohort."
                    </p>
                  </div>
                </div>
              </div>

            </motionElement.div>
          </div>

        </div>
      </div>
    </section>
  );
}
