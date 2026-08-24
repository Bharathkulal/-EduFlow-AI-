import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 text-left relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand block (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">EduFlow AI</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">"From Content to Classroom to Student Growth."</p>
            <p className="text-xs text-gray-400 font-medium">One connected AI platform managing the complete planning, testing, and improvement cycle.</p>
          </div>

          {/* Links (8 Columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li><a href="#product" className="hover:text-indigo-600 transition-colors">Overview</a></li>
                <li><a href="#workflow" className="hover:text-indigo-600 transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#institutions" className="hover:text-indigo-600 transition-colors">For Institutions</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">AI Tools</h4>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li><a href="#assistant" className="hover:text-indigo-600 transition-colors">Lesson Plans</a></li>
                <li><a href="#assistant" className="hover:text-indigo-600 transition-colors">Quizzes</a></li>
                <li><a href="#assistant" className="hover:text-indigo-600 transition-colors">PPTs</a></li>
                <li><a href="#assistant" className="hover:text-indigo-600 transition-colors">Worksheets</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs text-gray-400 font-semibold gap-4">
          <span>&copy; 2026 EduFlow AI. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-900 transition-colors">GitHub</a>
            <a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
