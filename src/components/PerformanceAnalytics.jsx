import React, { useState } from 'react';
import { BarChart3, AlertCircle, FileSpreadsheet, Play, Check } from 'lucide-react';

const topics = [
  { name: 'DBMS Basics', val: 91 },
  { name: 'Functional Dep.', val: 82 },
  { name: '1NF (First Normal Form)', val: 88 },
  { name: '2NF (Second Normal Form)', val: 74 },
  { name: '3NF (Third Normal Form)', val: 52 }
];

export default function PerformanceAnalytics() {
  const [generated, setGenerated] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">AI COHORT DIAGNOSTICS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Don't just see marks. Understand learning.
          </h2>
        </div>

        {/* Analytics UI Box */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Performance chart representation (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-5">
                <span className="text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>Class Topic Performance</span>
                </span>
                <span className="text-xs font-bold text-gray-500">Average: 76%</span>
              </div>

              {/* Bar charts list */}
              <div className="space-y-4">
                {topics.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>{t.name}</span>
                      <span className={t.val < 60 ? 'text-rose-500 font-bold' : 'text-gray-900'}>{t.val}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${t.val < 60 ? 'bg-rose-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${t.val}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights & Actions (5 columns) */}
          <div className="lg:col-span-5 bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">AI DIAGNOSTIC INSIGHT</span>
              
              {/* Insight details */}
              <div className="flex items-start space-x-3 bg-rose-50/30 border border-rose-100/50 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-rose-700">Critical Concept Gap Found</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed font-semibold">
                    "42% of students in Class B are struggling with 3NF (Third Normal Form) transitive closures."
                  </p>
                </div>
              </div>

              {/* Action plan */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">RECOMMENDED ACTION</span>
                <p className="text-xs font-bold text-gray-800 leading-relaxed bg-white border border-gray-100 rounded-xl p-3.5 shadow-xs">
                  "Create an application-level worksheet focused on 3NF transitive relations to reinforce database anomalies."
                </p>
              </div>
            </div>

            {/* Action trigger button */}
            <button 
              onClick={() => setGenerated(true)}
              className={`w-full py-3 rounded-xl text-xs font-semibold shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 border ${
                generated 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
              }`}
            >
              {generated ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Worksheet Sent to Cohort</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Generate Recommended Practice</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
