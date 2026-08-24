import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, FileText, CheckCircle } from 'lucide-react';

const bloomTaxonomy = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];

export default function AssessmentGenerator() {
  const [difficulty, setDifficulty] = useState({ easy: 20, medium: 50, hard: 30 });
  const [selectedBlooms, setSelectedBlooms] = useState(bloomTaxonomy.slice(0, 4));

  const toggleBlooms = (val) => {
    if (selectedBlooms.includes(val)) {
      setSelectedBlooms(selectedBlooms.filter(item => item !== val));
    } else {
      setSelectedBlooms([...selectedBlooms, val]);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">ASSESSMENT BUILDER</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Build better assessments in seconds.
          </h2>
        </div>

        {/* Builder Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Settings panel (5 columns) */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-5">
                <Settings className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-gray-900">Configurator Parameters</span>
              </div>

              {/* Form entries */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">SUBJECT</label>
                    <input readOnly value="Computer Science" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-xs font-semibold text-gray-700 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">CHAPTER</label>
                    <input readOnly value="DBMS Normalization" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-xs font-semibold text-gray-700 focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">TOTAL MARKS</label>
                    <input readOnly value="50 Marks" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-xs font-semibold text-gray-700 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">QUESTION FORMATS</label>
                    <input readOnly value="MCQs + Subjective" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-xs font-semibold text-gray-700 focus:outline-none" />
                  </div>
                </div>

                {/* Difficulty slider block */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-gray-400 block">DIFFICULTY BALANCE</label>
                    <span className="text-[10px] font-bold text-gray-500">20% · 50% · 30%</span>
                  </div>
                  <div className="flex space-x-1 h-3 rounded-full overflow-hidden border border-gray-100">
                    <div className="bg-emerald-400" style={{ width: '20%' }} />
                    <div className="bg-amber-400" style={{ width: '50%' }} />
                    <div className="bg-rose-400" style={{ width: '30%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-semibold text-gray-400 mt-1">
                    <span>Easy (20%)</span>
                    <span>Medium (50%)</span>
                    <span>Hard (30%)</span>
                  </div>
                </div>

                {/* Blooms Taxonomy checklist */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-2">COGNITIVE LEVEL (BLOOMS)</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {bloomTaxonomy.map((bloom, idx) => {
                      const isSelected = selectedBlooms.includes(bloom);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleBlooms(bloom)}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all duration-150 ${
                            isSelected 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                              : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                          }`}
                        >
                          {bloom}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Config buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-50">
              <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all duration-150">
                Generate Paper
              </button>
              <button className="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition-all duration-150">
                Generate Answer Key
              </button>
            </div>
          </div>

          {/* Question paper preview (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">GENERATED ASSESSMENT PREVIEW</span>
              
              <div className="space-y-4">
                {/* Q1 MCQ */}
                <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/20">
                  <div className="flex justify-between items-center text-[10px] font-bold mb-1.5">
                    <span className="text-gray-400">QUESTION 01 (MCQ)</span>
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Remember · 1 Mark</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 leading-relaxed">
                    "Which of the following anomalies is specifically resolved by normalizing a table from 1NF to 2NF?"
                  </p>
                </div>

                {/* Q2 Short Answer */}
                <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/20">
                  <div className="flex justify-between items-center text-[10px] font-bold mb-1.5">
                    <span className="text-gray-400">QUESTION 02 (SHORT ANSWER)</span>
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Understand · 3 Marks</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 leading-relaxed">
                    "Define transitive functional dependency and give an example of how it leads to insertion anomalies."
                  </p>
                </div>

                {/* Q3 Application */}
                <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/20">
                  <div className="flex justify-between items-center text-[10px] font-bold mb-1.5">
                    <span className="text-gray-400">QUESTION 03 (APPLICATION EXERCISE)</span>
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Apply · 5 Marks</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 leading-relaxed">
                    "Given the relation R(A, B, C, D) and functional dependencies F = &#123;A → B, C → D&#125;, determine the candidate keys and normalize R to 3NF."
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4 mt-6 text-center">
              <span className="text-[10px] text-gray-400 font-semibold">
                Total generated questions: 12 (10 MCQs, 2 Exercises) · 50 Marks Total
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
