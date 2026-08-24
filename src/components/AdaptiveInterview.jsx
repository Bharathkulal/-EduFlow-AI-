import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, User, Check, X, ShieldAlert, Cpu } from 'lucide-react';

export default function AdaptiveInterview() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">ADAPTIVE TECHNOLOGY</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
            Not a question bank. <br className="hidden sm:inline" />
            A conversation that adapts.
          </h2>
        </div>

        {/* Interactive Comparison Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Traditional Interview Mockup (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="p-1.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-500">
                  <X className="w-4 h-4" />
                </span>
                <span className="text-sm font-bold text-gray-900">Traditional Static Interview</span>
              </div>

              {/* Step list for traditional */}
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-xs text-gray-600 flex items-start space-x-2.5">
                  <span className="font-bold text-gray-400 mt-0.5">Q1:</span>
                  <p>"Explain what Node.js is."</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-xs text-gray-600 flex items-start space-x-2.5">
                  <span className="font-bold text-gray-400 mt-0.5">A1:</span>
                  <p>"It is a JavaScript runtime environment."</p>
                </div>
                
                {/* Visual Break */}
                <div className="flex justify-center my-2 text-gray-300">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-xs text-gray-600 flex items-start space-x-2.5">
                  <span className="font-bold text-gray-400 mt-0.5">Q2:</span>
                  <p className="text-gray-400 italic">"What is a database index?" (Ignores previous context entirely)</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4 mt-8 flex items-center space-x-2 text-xs text-rose-500 font-semibold bg-rose-50/30 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>Rigid question banks fail to test architectural depth.</span>
            </div>
          </div>

          {/* Verity Adaptive Loop Mockup (Right) */}
          <div className="lg:col-span-7 bg-white border-2 border-indigo-600/30 rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 -z-10" />

            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-bold text-gray-900">Verity Adaptive Engine</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                
                {/* AI Question */}
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">VERITY</span>
                    <div className="bg-gray-50 border border-gray-100 text-gray-800 text-xs sm:text-sm p-3.5 rounded-xl rounded-tl-none max-w-md font-medium">
                      "You used Node.js in your project. Why did you choose it?"
                    </div>
                  </div>
                </div>

                {/* Student Answer */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">CANDIDATE</span>
                    <div className="bg-indigo-600 text-white text-xs sm:text-sm p-3.5 rounded-xl rounded-tr-none max-w-md font-medium text-left">
                      "It was easier to build REST APIs quickly."
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                </div>

                {/* AI Follow-up */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span className="text-[10px] font-bold text-indigo-600">VERITY</span>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50 border border-rose-100 px-1.5 py-0.2 rounded uppercase tracking-wider">
                        Contextual Follow-up
                      </span>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs sm:text-sm p-3.5 rounded-xl rounded-tl-none max-w-md font-semibold">
                      "Fair. Now imagine your API receives 100,000 requests per minute. What architectural changes would you make to sustain that load?"
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-500 font-semibold bg-gray-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>AI generated a follow-up based on your response.</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
