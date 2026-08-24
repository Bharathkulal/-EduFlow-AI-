import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          From lesson planning to student progress — <br />
          <span className="text-indigo-600">let AI handle the repetitive work.</span>
        </h2>
        <p className="text-base text-gray-500 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
          Create better teaching resources, understand student performance, and personalize learning from one intelligent platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a 
            href="#hero-section"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span>Start Creating</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a 
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200"
          >
            Explore the Platform
          </a>
        </div>
      </div>
    </section>
  );
}
