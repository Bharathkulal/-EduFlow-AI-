import React from 'react';
import { Presentation, ClipboardList, BookOpen, Key } from 'lucide-react';

const resources = [
  {
    title: 'AI PRESENTATION',
    label: 'Ready-to-teach slides',
    icon: Presentation,
    preview: (
      <div className="bg-slate-900 text-white rounded-lg p-4 aspect-video flex flex-col justify-between border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="w-12 h-1 bg-indigo-500 rounded-full" />
        <div>
          <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest block mb-0.5">SLIDE 02 / 12</span>
          <h4 className="font-bold text-[11px]">Database Anomalies & Normalization</h4>
          <p className="text-[8px] text-slate-400 mt-1">Understanding Update, Insertion, and Deletion Anomalies.</p>
        </div>
      </div>
    )
  },
  {
    title: 'AI WORKSHEET',
    label: 'Practice activities',
    icon: ClipboardList,
    preview: (
      <div className="bg-white border border-gray-100 rounded-lg p-3 text-left space-y-2 shadow-xs">
        <div className="flex justify-between items-center text-[7px] font-bold text-gray-400 pb-1 border-b border-gray-50">
          <span>WORKSHEET 01</span>
          <span>STUDENT NAME: ____________</span>
        </div>
        <h5 className="font-bold text-[10px] text-gray-900">Task 1: Isolate anomalies in Employee_Project schema</h5>
        <div className="w-full bg-gray-50 h-10 border border-dashed border-gray-200 rounded flex items-center justify-center text-[8px] text-gray-400">
          Student answer space
        </div>
      </div>
    )
  },
  {
    title: 'AI HOMEWORK',
    label: 'Personalized assignments',
    icon: BookOpen,
    preview: (
      <div className="bg-white border border-gray-100 rounded-lg p-3 text-left space-y-2 shadow-xs">
        <div className="flex justify-between items-center text-[7px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded w-max">
          <span>HOMEWORK: HIGH GAP GROUP</span>
        </div>
        <h5 className="font-bold text-[10px] text-gray-900">Solve 3 schema normalization exercises</h5>
        <p className="text-[8px] text-gray-500">Custom assignments configured for students struggling with 2NF transitive closures.</p>
      </div>
    )
  },
  {
    title: 'AI ANSWER KEY',
    label: 'Instant reference',
    icon: Key,
    preview: (
      <div className="bg-white border border-gray-100 rounded-lg p-3 text-left space-y-2 shadow-xs border-l-2 border-l-emerald-500">
        <div className="flex justify-between items-center text-[7px] font-bold text-emerald-600">
          <span>OFFICIAL GRADING SCHEME</span>
        </div>
        <h5 className="font-bold text-[10px] text-gray-900">Answer Key: Q3 Normalization</h5>
        <p className="text-[8px] text-gray-600 font-medium leading-relaxed bg-emerald-50/50 p-1.5 rounded border border-emerald-100/30">
          "Award 2 marks for isolating the transitive key C → D, and 3 marks for writing corrected tables."
        </p>
      </div>
    )
  }
];

export default function ResourceGenerator() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">RESOURCE DEPOT</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Instant slides, worksheets, and keys.
          </h2>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6 text-left flex flex-col justify-between space-y-6 hover:shadow-sm transition-shadow duration-200"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-4 h-4 text-indigo-600" />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.title}</span>
                  </div>
                  <h4 className="font-extrabold text-gray-950 text-sm mb-4">{item.label}</h4>
                </div>

                {/* Simulated preview display */}
                <div className="border border-gray-200/60 rounded-xl p-3 bg-white shadow-xs">
                  {item.preview}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
