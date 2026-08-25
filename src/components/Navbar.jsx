import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
      ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' 
      : 'bg-white border-b border-gray-100 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              E
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">EduFlow AI</span>
          </div>

          {/* Center navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <a href="#product" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Product</a>
            <a href="#workflow" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#assistant" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">AI Tools</a>
            <a href="#teacher-section" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">For Teachers</a>
            <a href="#student-section" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">For Students</a>
            <a href="#institutions" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">For Institutions</a>
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setView('login')}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setView('login')}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Start Creating
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
        isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="px-4 pt-2 pb-4 space-y-3">
          <a href="#product" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Product</a>
          <a href="#workflow" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">How It Works</a>
          <a href="#assistant" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">AI Tools</a>
          <a href="#teacher-section" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">For Teachers</a>
          <a href="#student-section" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">For Students</a>
          <a href="#institutions" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">For Institutions</a>
          
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <button 
              onClick={() => {
                setView('login');
                setIsOpen(false);
              }}
              className="text-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors w-full"
            >
              Sign In
            </button>
            <button 
              onClick={() => {
                setView('login');
                setIsOpen(false);
              }}
              className="text-center px-4 py-2.5 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
            >
              Start Creating
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
