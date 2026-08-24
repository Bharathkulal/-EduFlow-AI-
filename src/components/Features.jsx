import React from 'react';
import { 
  Video, FileSearch, Code, Compass, BookOpen, FileSpreadsheet, Mic, LineChart 
} from 'lucide-react';

const featureList = [
  {
    title: 'Adaptive AI Interviews',
    desc: 'Contextual follow-ups based on the depth of candidate responses, not static question sets.',
    icon: Video
  },
  {
    title: 'Resume Intelligence',
    desc: 'Deeper extraction of actual skill levels vs keyword parsing.',
    icon: FileSearch
  },
  {
    title: 'Project Understanding',
    desc: 'Verify that students actually built the systems listed on their portfolios.',
    icon: Code
  },
  {
    title: 'Skill Gap Detection',
    desc: 'Flag exact syntax, design, or algorithmic weaknesses immediately.',
    icon: Compass
  },
  {
    title: 'Personalized Learning',
    desc: '7-day improvement tracks tailored specifically to fill mapped vulnerabilities.',
    icon: BookOpen
  },
  {
    title: 'Interview Reports',
    desc: 'In-depth diagnostic files covering problem solving, technical, and communication metrics.',
    icon: FileSpreadsheet
  },
  {
    title: 'Voice Conversations',
    desc: 'Natural conversational pace matching realistic recruiter telephone calls.',
    icon: Mic
  },
  {
    title: 'College Analytics',
    desc: 'Campus-wide metrics, cohort tracking, and centralized skill dashboards.',
    icon: LineChart
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">PLATFORM FEATURES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Everything needed to verify <br className="hidden sm:inline" />
            and improve technical readiness.
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-100/80 rounded-2xl p-6 text-left hover:shadow-sm transition-shadow duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-50/50 border border-indigo-100/30 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
