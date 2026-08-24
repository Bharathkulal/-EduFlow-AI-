import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert, Calendar, CheckCircle } from 'lucide-react';

const learningSteps = [
  { day: 'Day 1', task: 'Review 3NF Concepts', detail: 'Read annotated chapter sections covering schema anomalies and dependencies.' },
  { day: 'Day 2', task: 'Solve 5 Basic Questions', detail: 'Verify understanding of functional closures and transitive relations.' },
  { day: 'Day 3', task: 'Solve 5 Application Questions', detail: 'Evaluate transitive keys and normal forms on dynamic relational schemas.' },
  { day: 'Day 4', task: 'Take Adaptive Quiz', detail: 'An adaptive 10-question evaluation check built by the co-pilot.' },
  { day: 'Day 5', task: 'Exit Reassessment', detail: 'A verified final check to update candidate strengths index.' }
];

export default function PersonalizedLearning() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">PERSONALIZATION LOOP</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Every student learns differently.
          </h2>
        </div>

        {/* Personalized Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Student Profile Card (4 columns) */}
          <div className="lg:col-span-4 bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="border-b border-gray-200/60 pb-3 mb-5">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">CANDIDATE CARD</span>
                <h3 className="font-extrabold text-gray-900 text-sm mt-0.5">Rahul Sharma</h3>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded mt-1.5 inline-block">
                  Overall Score: 72%
                </span>
              </div>

              {/* Strengths / Gaps */}
              <div className="space-y-4">
                {/* Strengths */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center space-x-1.5 uppercase">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>VERIFIED STRENGTHS</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['DBMS Basics', '1NF'].map((tag, idx) => (
                      <span key={idx} className="bg-white border border-gray-100 text-[10px] font-bold text-gray-600 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attention */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-rose-500 flex items-center space-x-1.5 uppercase">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>NEEDS ATTENTION</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['3NF Anomalies', 'BCNF Relation keys'].map((tag, idx) => (
                      <span key={idx} className="bg-white border border-gray-100 text-[10px] font-bold text-gray-600 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-semibold border-t border-gray-200/60 pt-4 mt-6">
              AI adapts the next learning activity based on performance.
            </div>
          </div>

          {/* Learning plan list (8 columns) */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-5">AI PERSONALIZED REMEDIAL PLAN</span>
              
              <div className="relative border-l border-gray-100 pl-6 ml-2 space-y-5">
                {learningSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* circle marker */}
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center shadow-xs" />
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-1.5 py-0.2 rounded uppercase">
                          {step.day}
                        </span>
                        <h4 className="font-bold text-gray-900 text-xs">{step.task}</h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-medium mt-0.5">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
