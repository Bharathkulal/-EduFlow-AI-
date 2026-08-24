import React from 'react';
import { Users, BarChart, CheckSquare, Sparkles } from 'lucide-react';

const stats = [
  { label: 'TOTAL STUDENTS', value: '184', icon: Users, change: '+12 this week' },
  { label: 'AVG PERFORMANCE', value: '76%', icon: BarChart, change: '+2.4% overall' },
  { label: 'ASSIGNMENTS DEPLOYED', value: '28', icon: CheckSquare, change: '6 active currently' }
];

const insights = [
  '3 topics need immediate curriculum attention.',
  '12 students require personalized practice sheets.',
  '74% of the cohort struggled with 3NF Normalization anomalies.'
];

export default function TeacherDashboard() {
  return (
    <section id="teacher-section" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">ADMINISTRATIVE VIEW</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Manage progress. Build insights.
          </h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Left stats panel (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                      <Icon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-2xl font-extrabold text-gray-950 block mb-1">{stat.value}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">{stat.change}</span>
                  </div>
                );
              })}
            </div>

            {/* Performance charts mockup card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">TOPIC RETENTION TARGETS</span>
              <div className="space-y-3">
                {[
                  { name: '1NF Normalization', score: 88, status: 'Stable' },
                  { name: '2NF Schema design', score: 74, status: 'Satisfactory' },
                  { name: '3NF Functional closures', score: 52, status: 'Needs Revision' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700">{item.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-bold ${
                        item.score < 60 ? 'text-rose-500' : 'text-emerald-500'
                      }`}>{item.status}</span>
                      <span className="font-bold text-gray-950">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Insights card (5 columns) */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-gray-900">Co-pilot Cohort Insights</span>
              </div>

              <div className="space-y-4">
                {insights.map((ins, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed font-medium">{ins}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              View AI Recommendations
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
