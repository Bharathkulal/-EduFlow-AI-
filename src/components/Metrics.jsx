import React from 'react';

const metrics = [
  { value: '1 Source', label: 'Multiple Teaching Resources', description: 'Convert PDF chapters to lesson assets' },
  { value: '90%', label: 'Prep Time Saved per Lesson', description: 'Reclaim hours spent on repetitive documentation' },
  { value: '1 Dashboard', label: 'Complete Student Insights', description: 'Connected workflow from testing to revision plans' },
];

export default function Metrics() {
  return (
    <div className="bg-white border-y border-gray-100 py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 md:divide-x md:divide-gray-100">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start md:px-8 first:pl-0">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-600 mb-2">
                {metric.value}
              </span>
              <span className="text-sm font-semibold text-gray-900 mb-1">
                {metric.label}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {metric.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
