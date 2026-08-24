import React, { useState } from 'react';
import { Languages } from 'lucide-react';

const translations = [
  { lang: 'English', native: 'English', text: '“Explain functional dependency and normalization rules.”' },
  { lang: 'Kannada', native: 'ಕನ್ನಡ', text: '“ಫಂಕ್ಷನಲ್ ಡಿಪೆಂಡೆನ್ಸಿ ಮತ್ತು ನಾರ್ಮಲೈಸೇಶನ್ ನಿಯಮಗಳನ್ನು ವಿವರಿಸಿ.”' },
  { lang: 'Hindi', native: 'हिन्दी', text: '“कार्यात्मक निर्भरता और सामान्यीकरण नियमों की व्याख्या करें।”' },
  { lang: 'Tamil', native: 'தமிழ்', text: '“செயல்பாட்டு சார்பு மற்றும் இயல்பாக்க விதிகளை விளக்கவும்.”' },
  { lang: 'Telugu', native: 'తెలుగు', text: '“ఫంక్షనల్ డిపెండెన్సీ మరియు నార్మలైజేషన్ నియమాలను వివరించండి.”' }
];

export default function Multilingual() {
  const [activeLang, setActiveLang] = useState('English');

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase block mb-3">LOCALIZATION</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
            Teach in the language your students understand.
          </h2>
          <p className="text-sm text-gray-500 font-medium max-w-xl">
            EduFlow AI translates generated worksheets, question papers, and answer keys while preserving semantic meaning.
          </p>
        </div>

        {/* Translation panel card */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm text-left">
          {/* Tab selectors */}
          <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-5 mb-8">
            {translations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLang(item.lang)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors duration-150 ${
                  activeLang === item.lang 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.native} ({item.lang})
              </button>
            ))}
          </div>

          {/* Translation result */}
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-2">
                TRANSLATION TARGET: {activeLang.toUpperCase()}
              </span>
              <p className="text-lg font-bold text-gray-900 leading-relaxed font-sans">
                {translations.find(t => t.lang === activeLang).text}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
