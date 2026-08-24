import React, { useState } from 'react';
import { HelpCircle, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

const quizTopics = [
  { name: '1NF (First Normal Form)', score: 92, status: 'Mastered' },
  { name: '2NF (Second Normal Form)', score: 81, status: 'Mastered' },
  { name: '3NF (Third Normal Form)', score: 54, status: 'Weak concept' },
  { name: 'BCNF (Boyce-Codd Normal Form)', score: 62, status: 'Needs attention' }
];

export default function StudentAssessment() {
  const [showResult, setShowResult] = useState(false);

  return (
    <section id="student-section" className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">STUDENT EXPERIENCE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Teaching doesn't end when the test begins.
          </h2>
        </div>

        {/* Assessment Module Container */}
        <div className="max-w-3xl mx-auto bg-[#FAFAFA] border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
          
          <div className="flex justify-between items-center border-b border-gray-200/60 pb-4 mb-6">
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">Quiz: DBMS — Normalization</h3>
              <p className="text-[10px] text-gray-400 font-medium">Assignment ID: CS-302-Q1</p>
            </div>
            <button 
              onClick={() => setShowResult(!showResult)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline"
            >
              {showResult ? 'Show Active Quiz View' : 'Show Results Summary'}
            </button>
          </div>

          {!showResult ? (
            /* Quiz Active View */
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                <span>Question 03 of 10</span>
                <span>Time remaining: 18:45</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '30%' }} />
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs space-y-4">
                <h4 className="font-bold text-gray-900 text-sm leading-relaxed">
                  "If a relation has no multi-valued attributes, no partial functional dependencies, but contains transitive dependencies, which normal form is it in?"
                </h4>
                
                {/* Options */}
                <div className="space-y-2">
                  {['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'].map((opt, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg border text-xs font-semibold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                        idx === 1 
                          ? 'bg-indigo-50/50 border-indigo-200 text-indigo-900' 
                          : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => setShowResult(true)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center space-x-1"
                >
                  <span>Submit Answer</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-5 shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">SUBMISSION GRADE</span>
                  <span className="text-3xl font-extrabold text-gray-950">78%</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase">
                    Passed
                  </span>
                </div>
              </div>

              {/* Topic metrics */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">TOPIC PERFORMANCE BREAKDOWN</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizTopics.map((topic, idx) => {
                    const isWeak = topic.score < 70;
                    return (
                      <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs flex justify-between items-center">
                        <div>
                          <h5 className="font-bold text-gray-900 text-xs mb-1">{topic.name}</h5>
                          <span className={`text-[10px] font-bold flex items-center space-x-1 ${
                            isWeak ? 'text-rose-500' : 'text-emerald-500'
                          }`}>
                            {isWeak ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            <span>{topic.status}</span>
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-gray-950">{topic.score}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
