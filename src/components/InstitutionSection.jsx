import React from 'react';
import { Landmark, ArrowRight, ShieldCheck, Users, ClipboardList } from 'lucide-react';

const adminFeatures = [
  { title: 'Teacher productivity tracking', desc: 'Track generation counts and grading time saved across departments.' },
  { title: 'Student performance analytics', desc: 'Compare cohort readiness statistics and diagnostic test marks.' },
  { title: 'Centralized academic resources', desc: 'Maintain school-wide lesson plans, question banks, and answer keys.' }
];

export default function InstitutionSection() {
  return (
    <section id="institutions" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">INSTITUTIONS & SCHOOLS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            From individual classrooms <br className="hidden sm:inline" />
            to institution-wide intelligence.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: features list (6 columns) */}
          <div className="lg:col-span-6 text-left space-y-6">
            <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
              Centralized controls built for deans, principals, and academic administrators.
            </h3>
            
            <div className="space-y-4">
              {adminFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{feat.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Institution Dashboard mockup (6 columns) */}
          <div className="lg:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left relative">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <Landmark className="w-4 h-4 text-indigo-600" />
                <h3 className="font-extrabold text-gray-950 text-sm">Academic Operations</h3>
              </div>
              <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase">
                Dean Portal
              </span>
            </div>

            {/* Department stats */}
            <div className="space-y-4">
              <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider">DEPARTMENT PERFORMANCE METRICS</span>
              
              <div className="space-y-3">
                {[
                  { name: 'Computer Science Department', score: 81, faculty: 12 },
                  { name: 'Mathematics Department', score: 76, faculty: 8 },
                  { name: 'Electrical Engineering Department', score: 68, faculty: 14 }
                ].map((dept, idx) => (
                  <div key={idx} className="bg-gray-50/50 border border-gray-100/50 rounded-xl p-3.5 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-gray-900">{dept.name}</h4>
                      <span className="text-[10px] text-gray-400 font-semibold">{dept.faculty} faculty active</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-indigo-600 font-bold block">Avg Score</span>
                      <span className="font-extrabold text-gray-950 text-sm">{dept.score}%</span>
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
