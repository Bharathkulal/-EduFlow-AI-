import React from 'react';
import { Sparkles, FileText, CheckSquare, BarChart } from 'lucide-react';

const problems = [
  {
    num: '01',
    title: 'Create',
    description: 'Spend hours drafting distinct question papers, MCQs, worksheets, and custom homework for students of varying difficulty groups.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'Prepare',
    description: 'Assemble session plans, PowerPoint lecture materials, and educational notes from core textual materials manually.',
    icon: Sparkles,
  },
  {
    num: '03',
    title: 'Evaluate',
    description: 'Individually grade subjective answers, cross-reference scoring guides, and log marks into tracking sheets.',
    icon: CheckSquare,
  },
  {
    num: '04',
    title: 'Report',
    description: 'Synthesize performance figures into actionable reports and identify which specific concepts need attention.',
    icon: BarChart,
  },
];

export default function ProblemSection() {
  return (
    <section id="product" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">THE WORKLOAD BOTTLENECK</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
            Teaching shouldn't mean doing the same work again and again.
          </h2>
          <p className="text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-xl inline-block">
            EduFlow AI brings these workflows together in one place.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl font-extrabold text-gray-100 font-mono tracking-tight">
                      {prob.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Icon className="w-4.5 h-4.5 text-gray-700" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {prob.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {prob.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
