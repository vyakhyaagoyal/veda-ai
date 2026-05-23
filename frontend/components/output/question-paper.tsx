import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Bell, 
  ChevronDown, 
  FileText, 
  CheckCircle2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  text: string;
  marks: number;
  answer: string;
}

// --- Mock Data (Based on the reference image) ---
const QUESTIONS: Question[] = [
  { id: 1, difficulty: 'Easy', text: 'Define electroplating. Explain its purpose.', marks: 2, answer: 'Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.' },
  { id: 2, difficulty: 'Moderate', text: 'What is the role of a conductor in the process of electrolysis?', marks: 2, answer: 'A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.' },
  { id: 3, difficulty: 'Easy', text: 'Why does a solution of copper sulfate conduct electricity?', marks: 2, answer: 'Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.' },
  { id: 4, difficulty: 'Moderate', text: 'Describe one example of the chemical effect of electric current in daily life.', marks: 2, answer: 'An example is the electroplating of silver on jewelry to prevent tarnishing.' },
  { id: 5, difficulty: 'Moderate', text: 'Explain why electric current is said to have chemical effects.', marks: 2, answer: 'Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.' },
  { id: 6, difficulty: 'Challenging', text: 'How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved.', marks: 2, answer: 'Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons: 2H2O + 2e- -> H2 + 2OH-. Na+ + OH- -> NaOH (in solution).' },
  { id: 7, difficulty: 'Challenging', text: 'What happens at the cathode and anode during the electrolysis of water? Name the gases evolved.', marks: 2, answer: 'At the cathode: water is reduced to hydrogen gas and hydroxide ions. At the anodic: water is oxidized to oxygen gas and hydrogen ions.' },
  { id: 8, difficulty: 'Easy', text: 'Mention the type of current used in electroplating and justify why it is used.', marks: 2, answer: 'Direct Current (DC) is used to ensure a constant flow of ions in one direction for uniform deposition.' },
  { id: 9, difficulty: 'Moderate', text: 'What is the importance of electric current in the field of metallurgy?', marks: 2, answer: 'It is used for electrolytic refining of metals like copper and aluminum to achieve high purity.' },
  { id: 10, difficulty: 'Challenging', text: 'Explain with a chemical equation how copper is deposited during the electroplating of an object.', marks: 2, answer: 'Copper ions are reduced at the cathode: Cu2+ + 2e- -> Cu(s).' },
];

const QuestionPaper = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6]/50 font-sans text-[#2D2D2D]">
      {/* Top Navigation Bar */}
      <header className="h-[72px] bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2 text-gray-400">
            <h1 className="text-lg font-bold text-[#2D2D2D]">Assignment Preview</h1>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1 max-w-xl px-12">
           <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]/5"
              />
           </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
               <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-6">
        {/* AI Assistant Banner */}
        <div className="bg-[#1F2937] rounded-3xl p-6 mb-10 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Lightbulb className="text-orange-400" size={24} />
            </div>
            <p className="text-white/90 text-sm font-medium leading-relaxed max-w-xl">
              Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#111827] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            <Download size={18} />
            Download as PDF
          </button>
        </div>

        {/* Paper Container */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-16 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-12 border-b border-gray-100 pb-12">
            <h2 className="text-3xl font-extrabold text-[#2D2D2D] mb-2 uppercase tracking-tight">Delhi Public School, Sector-4, Bokaro</h2>
            <h3 className="text-xl font-bold text-gray-700 mb-1">Subject: Science (CBSE Grade 8)</h3>
            <p className="text-sm font-bold text-gray-400">Academic Session 2024-25</p>
          </div>

          {/* Paper Meta */}
          <div className="flex justify-between items-center mb-8 px-4">
            <div className="font-bold text-sm text-[#2D2D2D]">Time Allowed: <span className="font-normal text-gray-500">45 minutes</span></div>
            <div className="font-bold text-sm text-[#2D2D2D]">Maximum Marks: <span className="font-normal text-gray-500">20</span></div>
          </div>

          <p className="italic text-gray-500 text-sm mb-10 px-4">All questions are compulsory unless stated otherwise.</p>

          {/* Student Fields */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-16 px-4 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Name:</span>
              <div className="flex-1 border-b border-gray-200 border-dashed h-6"></div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Roll Number:</span>
              <div className="flex-1 border-b border-gray-200 border-dashed h-6"></div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Class:</span>
              <span className="text-sm font-bold">8th Section:</span>
              <div className="flex-1 border-b border-gray-200 border-dashed h-6"></div>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block border-b-2 border-[#2D2D2D] pb-2 px-8">
              <h4 className="text-2xl font-black uppercase tracking-widest">Section A</h4>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-8 mb-20 px-4">
            <div className="mb-6">
              <h5 className="font-bold text-sm text-[#2D2D2D] mb-1">Short Answer Questions</h5>
              <p className="text-xs italic text-gray-400">Attempt all questions. Each question carries 2 marks</p>
            </div>

            {QUESTIONS.map((q, idx) => (
              <div key={q.id} className="flex gap-4 group">
                <span className="font-black text-lg text-[#2D2D2D] min-w-[24px]">{idx + 1}.</span>
                <div className="flex-1">
                  <div className="text-base leading-relaxed text-gray-800 font-medium">
                    <span className={`text-[11px] font-bold uppercase mr-2 ${
                      q.difficulty === 'Easy' ? 'text-green-600' : 
                      q.difficulty === 'Moderate' ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      [{q.difficulty}]
                    </span>
                    {q.text} <span className="text-gray-400 text-sm ml-2">[{q.marks} Marks]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mb-20 opacity-30">
            <div className="h-px bg-gray-400 flex-1 border-dashed border-b"></div>
            <span className="text-[10px] font-bold uppercase tracking-[4px]">End of Question Paper</span>
            <div className="h-px bg-gray-400 flex-1 border-dashed border-b"></div>
          </div>

          {/* Answer Key */}
          <div className="bg-gray-50/80 rounded-[32px] p-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                 <CheckCircle2 size={24} />
              </div>
              <h4 className="text-xl font-bold">Answer Key:</h4>
            </div>

            <div className="space-y-8">
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="flex gap-4">
                  <span className="font-black text-[#2D2D2D]">{idx + 1}.</span>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {q.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Edit Button (VedaAI Style) */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-orange-600 text-white rounded-2xl shadow-xl shadow-orange-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
        <FileText size={24} />
      </button>
    </div>
  );
};

export default QuestionPaper;