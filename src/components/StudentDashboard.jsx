import React from 'react';
import { Target, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">STUDENT WORKSPACE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Own your revision.
          </h2>
        </div>

        {/* Dashboard Mockup */}
        <div className="max-w-4xl mx-auto bg-[#FAFAFA] border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left panel: Subjects & Progress (7 columns) */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 block uppercase mb-4">ENROLLED SUBJECTS</span>
              
              <div className="space-y-3">
                {[
                  { name: 'Computer Science II', progress: 84 },
                  { name: 'Database Management Systems', progress: 68 },
                  { name: 'Discrete Mathematics', progress: 91 }
                ].map((subj, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                      <span>{subj.name}</span>
                      <span className="text-gray-900 font-bold">{subj.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${subj.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Gaps & Actions (5 columns) */}
          <div className="md:col-span-5 bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">CURRENT RETENTION METRIC</span>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-emerald-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Strong: 1NF</span>
                  </span>
                  <span className="text-rose-500 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Weak: 3NF</span>
                  </span>
                </div>
              </div>

              {/* Action recommendation */}
              <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-xl p-3.5 text-xs text-indigo-950 font-bold flex items-start space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[9px] font-bold text-gray-400 block uppercase mb-0.5 font-sans">AI TASK PLANNER</span>
                  <p className="leading-relaxed">
                    "Practice 10 application-level questions on DBMS Normalization."
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors">
              Start Practice Session
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
