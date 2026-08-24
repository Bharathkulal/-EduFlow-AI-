import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, HelpCircle, GitPullRequest, FileText, ChevronRight } from 'lucide-react';

const steps = [
  { label: 'Upload Project', icon: Upload },
  { label: 'AI Code Analysis', icon: Cpu },
  { label: 'Project-Specific Questions', icon: HelpCircle },
  { label: 'Adaptive Viva Loops', icon: GitPullRequest },
  { label: 'Understanding Report', icon: FileText },
];

export default function ProjectViva() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">FUTURE CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Your project can be your interview.
          </h2>
        </div>

        {/* Workflow steps */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50/50 border border-gray-100/50 rounded-xl relative">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-900">{item.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex justify-center text-gray-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Demonstration dialog box */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-md p-6 sm:p-8 text-left relative overflow-hidden">
          <div className="border-b border-gray-50 pb-4 mb-6 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">CONVERSATION WALKTHROUGH</span>
            <span className="text-[10px] font-bold text-gray-400">Context: Student Portfolio</span>
          </div>

          <div className="space-y-5">
            {/* Student Upload card */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 max-w-sm">
              <Upload className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase">Student uploaded</span>
                <span className="text-xs font-bold text-gray-900">"College Management System"</span>
              </div>
            </div>

            {/* AI Q1 */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">AI Query 01</span>
              <div className="bg-indigo-50/30 border border-indigo-100/50 text-gray-800 text-xs sm:text-sm p-3.5 rounded-xl max-w-lg font-medium leading-relaxed">
                "I see you chose MongoDB for this project. Why did you choose it over a relational database like PostgreSQL?"
              </div>
            </div>

            {/* AI Q2 (Adaptive scenario) */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">AI Follow-up Scenario (Scale evaluation)</span>
              <div className="bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs sm:text-sm p-3.5 rounded-xl max-w-lg font-semibold leading-relaxed">
                "Understood. If the college scaling demands grew to 1 million active students query latency would spike. How would you redesign your MongoDB schema or indexing to protect query response times?"
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
