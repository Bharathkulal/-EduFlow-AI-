import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function SkillGap() {
  const readinessMetrics = [
    { label: 'Technical Knowledge', val: 82 },
    { label: 'Problem Solving', val: 71 },
    { label: 'Communication', val: 76 },
    { label: 'Project Understanding', val: 88 },
  ];

  const skillGaps = [
    { name: 'MongoDB', val: 54 },
    { name: 'System Design', val: 61 },
    { name: 'DSA', val: 68 },
  ];

  const strongSkills = [
    { name: 'React', val: 91 },
    { name: 'REST APIs', val: 87 },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">DIAGNOSTICS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Know exactly where you're strong — <br className="hidden sm:inline" />
            and where you're not.
          </h2>
        </div>

        {/* Dashboard Mockup Grid */}
        <div className="bg-[#FAFAFA] border border-gray-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left dial: Overall Score (4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-6">INTERVIEW READINESS</span>
              
              {/* Radial dial representation */}
              <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
                  {/* Gauge Arc */}
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#4f46e5" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * 78) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-extrabold text-gray-900 tracking-tight">78%</span>
                  <span className="text-[10px] font-bold text-gray-400 block mt-0.5">OVERALL SCORE</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-indigo-600 font-semibold bg-indigo-50/50 px-3 py-1 rounded-full border border-indigo-100/50">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Top 22% of Applicants</span>
              </div>
            </div>

            {/* Middle: Detailed Readiness Bars (4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">EVALUATION METRICS</span>
              
              {readinessMetrics.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                    <span>{item.label}</span>
                    <span className="text-gray-950 font-bold">{item.val}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="bg-indigo-600 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Skill Gaps and Strengths (4 Columns) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Skill Gaps Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest flex items-center space-x-1.5 mb-4">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>CRITICAL SKILL GAPS</span>
                </span>
                <div className="space-y-3.5">
                  {skillGaps.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
                        {skill.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-rose-500">{skill.val}%</span>
                        <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: `${skill.val}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Skills Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center space-x-1.5 mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>VERIFIED STRENGTHS</span>
                </span>
                <div className="space-y-3.5">
                  {strongSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
                        {skill.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-emerald-500">{skill.val}%</span>
                        <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${skill.val}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
