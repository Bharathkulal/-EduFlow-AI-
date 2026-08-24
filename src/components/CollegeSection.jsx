import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, TrendingUp, HelpCircle, ShieldCheck } from 'lucide-react';

const features = [
  { title: 'Student readiness analytics', desc: 'Monitor dynamic verification status across all cohorts.' },
  { title: 'Skill gap analysis', desc: 'Identify critical knowledge deficiencies before company recruitment cycles.' },
  { title: 'Mock interview tracking', desc: 'Log transcripts, voice performance, and preparation trends.' },
  { title: 'Cohort performance', desc: 'Compare departments, courses, and graduation years.' },
  { title: 'Individual reports', desc: 'Export granular technical and communication evaluation details.' },
];

export default function CollegeSection() {
  return (
    <section id="colleges" className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">COLLEGES & UNIVERSITIES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            From individual preparation <br className="hidden sm:inline" />
            to campus-wide readiness.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Dashboard Mockup */}
          <div className="lg:col-span-6 bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6 shadow-sm text-left relative">
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-4 mb-5">
              <div>
                <h3 className="font-bold text-gray-950 text-sm">Placement Readiness</h3>
                <p className="text-[11px] font-medium text-gray-400">Class of 2026 · Computer Science</p>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase">
                Active Cohort
              </span>
            </div>

            {/* Metrics cards inside dashboard */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] font-bold text-gray-400 block mb-1">TOTAL STUDENTS</span>
                <span className="text-xl font-extrabold text-gray-900">1,248</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] font-bold text-emerald-600 block mb-1">READY</span>
                <span className="text-xl font-extrabold text-emerald-600">64%</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] font-bold text-amber-500 block mb-1">IMPROVING</span>
                <span className="text-xl font-extrabold text-amber-500">23%</span>
              </div>
            </div>

            {/* Gaps list */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
              <span className="text-[10px] font-bold text-rose-500 block mb-3 uppercase tracking-wider">CRITICAL CAMPUS-WIDE GAPS</span>
              <div className="space-y-2.5">
                {[
                  { name: 'DSA', pct: 42, count: 524 },
                  { name: 'System Design', pct: 36, count: 449 },
                  { name: 'Communication', pct: 28, count: 349 },
                  { name: 'SQL Query Tuning', pct: 19, count: 237 },
                ].map((gap, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{gap.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400">{gap.count} students affected</span>
                      <span className="font-bold text-rose-500">{gap.pct}% gap</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Features Description */}
          <div className="lg:col-span-6 text-left space-y-6">
            <h3 className="text-xl font-extrabold text-gray-900">
              Campus administration tools built for modern placement offices.
            </h3>
            
            <div className="space-y-4">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{feat.title}</h4>
                    <p className="text-xs text-gray-500">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
