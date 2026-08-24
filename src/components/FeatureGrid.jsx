import React from 'react';
import { 
  FileText, Sparkles, BookOpen, Presentation, CheckCircle2, BarChart, Users, Languages, 
  Settings, Award, Cpu, Key, FileCheck2, ShieldCheck, ClipboardList, Target 
} from 'lucide-react';

const allFeatures = [
  { title: 'AI Lesson Plans', desc: '45-minute lesson timelines mapping targets.', icon: FileText },
  { title: 'AI Question Papers', desc: 'Subjective assessments tailored to chapters.', icon: Sparkles },
  { title: 'MCQ Generator', desc: 'Concept verification checks generated instantly.', icon: BookOpen },
  { title: 'Short/Long Questions', desc: 'Depth-based subjective query builder.', icon: Presentation },
  { title: 'Answer Keys', desc: 'Scoring guides and model references.', icon: Key },
  { title: 'PPT Generator', desc: 'Slideshow materials to support class delivery.', icon: Cpu },
  { title: 'Worksheet Builder', desc: 'Student tasks customized to topics.', icon: ClipboardList },
  { title: 'Homework Generator', desc: 'Personalized student exercises.', icon: Target },
  { title: 'Bloom\'s Taxonomy', desc: 'Questions mapping to cognitive levels.', icon: Award },
  { title: 'Multilingual Content', desc: 'Seamless translations across regional languages.', icon: Languages },
  { title: 'Subjective Answer Grading', desc: 'Guided criteria analysis for answers.', icon: CheckCircle2 },
  { title: 'Performance Analytics', desc: 'Diagnose exact student concept deficiencies.', icon: BarChart },
  { title: 'Personalized Learning', desc: 'Custom remediation schedules based on gaps.', icon: FileCheck2 },
  { title: 'Teacher Dashboard', desc: 'Monitor progress and batch materials.', icon: Users },
  { title: 'Student Dashboard', desc: 'Track weak concepts and practice tasks.', icon: ShieldCheck },
  { title: 'Institution Analytics', desc: 'Centralized view across depts & faculty.', icon: Settings }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">ALL CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Everything needed to verify <br className="hidden sm:inline" />
            and improve technical readiness.
          </h2>
        </div>

        {/* 16 grid items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {allFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-5 text-left shadow-xs hover:border-indigo-600/30 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50/50 border border-indigo-100/30 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-xs mb-1">{feat.title}</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
