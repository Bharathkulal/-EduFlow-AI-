import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Sparkles, BookOpen, Presentation, CheckCircle2, Play 
} from 'lucide-react';

const sidebarTools = [
  'Lesson Plan', 'Question Paper', 'MCQ Generator', 
  'Short/Long Questions', 'Answer Keys', 'PPT Generator', 
  'Worksheet Builder', 'Homework Generator', "Bloom's Taxonomy", 
  'Multilingual Content'
];

export default function TeachingAssistant() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsGenerating(false), 800);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <section id="assistant" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">TEACHER CO-PILOT</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Your teaching assistant, powered by AI.
          </h2>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 text-left items-stretch">
          
          {/* Left Sidebar (4 Columns) */}
          <div className="md:col-span-4 bg-gray-50/50 border-r border-gray-100 p-6 space-y-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">AI TEACHING TOOLS</span>
            <div className="space-y-1.5">
              {sidebarTools.map((tool, idx) => (
                <div 
                  key={idx} 
                  className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-between border ${
                    idx === 0 
                      ? 'bg-indigo-50 border-indigo-100/50 text-indigo-900' 
                      : 'bg-transparent border-transparent text-gray-600 hover:bg-gray-100/50 hover:text-indigo-600'
                  } transition-colors duration-150 cursor-pointer`}
                >
                  <span>{tool}</span>
                  {idx < 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
              ))}
            </div>
          </div>

          {/* Main Panel (8 Columns) */}
          <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Top row */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">CHAPTER ASSIGNMENT</span>
                  <h3 className="font-extrabold text-gray-950 text-lg">DBMS Normalization</h3>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-xs text-gray-500 font-semibold">Active Session</span>
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-4 mb-8">
                {[
                  { name: '45-Minute Lesson Plan', size: 'Objectives, flow guides & assessments' },
                  { name: 'Adaptive Question Paper', size: 'Bloom\'s structured subjective paper' },
                  { name: '15 Interactive MCQs', size: 'Concept verification assessment' },
                  { name: 'Lecture Slides (PPT)', size: '12 core concept presentation slides' },
                  { name: 'Structured Worksheet & Homework', size: 'Targeted student exercises' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-gray-50/50 pb-2">
                    <div>
                      <span className="font-bold text-gray-800 block">{item.name}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{item.size}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action panel */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <span className="text-[10px] font-bold text-gray-400 block uppercase mb-1">BATCH WORKFLOW</span>
                <span className="text-xs font-semibold text-gray-700">Compile all curriculum assets from chapter source</span>
              </div>
              <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end space-y-2">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isGenerating ? 'Compiling...' : 'Generate All'}</span>
                </button>
                {isGenerating && (
                  <div className="w-full sm:w-32 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
