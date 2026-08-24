import React, { useState } from 'react';
import { motion } from 'framer-motion';

const levels = [
  {
    level: 'Remember',
    desc: 'Retrieve relevant knowledge from long-term memory.',
    example: '“What is database normalization? Define 1NF, 2NF, and 3NF.”'
  },
  {
    level: 'Understand',
    desc: 'Determine the meaning of instructional messages.',
    example: '“Explain the difference between transitive and partial functional dependencies.”'
  },
  {
    level: 'Apply',
    desc: 'Carry out or use a procedure in a given situation.',
    example: '“Normalize the following database table from a raw spreadsheet format into 3NF.”'
  },
  {
    level: 'Analyze',
    desc: 'Break material into constituent parts and detect relationships.',
    example: '“Identify update and deletion anomalies inside the provided relational database schema.”'
  },
  {
    level: 'Evaluate',
    desc: 'Make judgments based on criteria and standards.',
    example: '“Evaluate if BCNF is required for this transactional system or if 3NF is sufficient.”'
  },
  {
    level: 'Create',
    desc: 'Put elements together to form a novel, coherent whole.',
    example: '“Design a normalized database schema and relation keys for a campus LMS system.”'
  }
];

export default function BloomTaxonomy() {
  const [activeIdx, setActiveIdx] = useState(2); // 'Apply' by default

  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">COGNITIVE DEPTH</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
            Go beyond remembering.
          </h2>
          <p className="text-sm text-gray-500 font-medium max-w-xl">
            Verity parses chapters and distributes assessments across all cognitive levels of Bloom's Taxonomy.
          </p>
        </div>

        {/* Bloom's Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Level List Selector (6 columns) */}
          <div className="lg:col-span-6 space-y-2">
            {levels.map((item, idx) => {
              const active = idx === activeIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex justify-between items-center ${
                    active 
                      ? 'bg-indigo-50/50 border-indigo-200 shadow-xs' 
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        0{idx+1}
                      </span>
                      <h4 className="font-extrabold text-gray-900 text-sm">{item.level}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question Preview Box (6 columns) */}
          <div className="lg:col-span-6 bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.03),transparent)] -z-10" />

            <div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-6">
                Active Cognitive Level: {levels[activeIdx].level}
              </span>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-widest">SAMPLE GENERATED QUESTION</span>
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
                  <p className="text-sm font-bold text-gray-900 leading-relaxed italic">
                    {levels[activeIdx].example}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200/60 pt-4 mt-6 text-xs text-gray-500 font-semibold">
              AI evaluates student reasoning at this specific tier during scoring.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
