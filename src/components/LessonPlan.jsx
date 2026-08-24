import React from 'react';
import { Clock, BarChart2, BookOpen, Target, CheckCircle2 } from 'lucide-react';

const objectives = [
  'Understand the core theoretical necessity of database normalization.',
  'Explain properties and criteria of 1NF, 2NF, and 3NF designs.',
  'Identify functional dependency relations and isolate schema anomalies.'
];

const timeline = [
  { time: '5 min', title: 'Introduction & Context', desc: 'Discuss database update anomalies and explain the need for split schemas.' },
  { time: '10 min', title: 'Core Concept Explanation', desc: 'Define full dependencies, transitive dependencies, and normal forms.' },
  { time: '15 min', title: 'Guided Example Walkthrough', desc: 'Convert a raw, anomalies-plagued schema into normalized tables.' },
  { time: '10 min', title: 'Interactive Group Activity', desc: 'Isolate anomalies inside a sample design scenario and suggest indexing.' },
  { time: '5 min', title: 'Quick Exit Assessment', desc: 'A 3-question MCQ ticket to gauge immediate topic absorption.' }
];

export default function LessonPlan() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">CURRICULUM PLANNING</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Structure your lessons instantly.
          </h2>
        </div>

        {/* Lesson Plan Card */}
        <div className="max-w-4xl mx-auto bg-[#FAFAFA] border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm text-left">
          <div className="border-b border-gray-200/60 pb-5 mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="font-extrabold text-gray-950 text-lg">45-Minute Lesson Plan</h3>
              <p className="text-xs text-gray-400 font-medium">Topic: DBMS Schema Normalization</p>
            </div>
            
            {/* Metadata Badges */}
            <div className="flex space-x-3 text-xs font-semibold">
              <div className="bg-white border border-gray-100 rounded-lg py-1 px-3 flex items-center space-x-1.5 text-gray-600">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>45 Mins</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg py-1 px-3 flex items-center space-x-1.5 text-gray-600">
                <BarChart2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Intermediate</span>
              </div>
            </div>
          </div>

          {/* Objectives Grid */}
          <div className="mb-8">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">LEARNING OBJECTIVES</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {objectives.map((obj, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex items-start space-x-2.5">
                  <Target className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Class timeline schedule */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">CLASS TIMELINE FLOW</span>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex bg-white border border-gray-100 rounded-xl p-4 items-start space-x-4">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded flex-shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
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
