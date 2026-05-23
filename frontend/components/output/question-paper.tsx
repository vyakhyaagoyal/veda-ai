import React from 'react';
import Image from 'next/image';

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
<div className="max-w-8xl mx-auto rounded-2xl bg-black/60">
      <main className="w-full mx-auto py-4 px-4">
        {/* AI Assistant Banner */}
        <div className="flex flex-col bg-black/70 rounded-3xl p-6 mb-4 items-start justify-start shadow-lg">
          <div className="flex items-center gap-4">
            
            <p className="text-white/90 text-md mb-3 font-medium leading-relaxed">
              Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#111827] rounded-full font-semibold text-sm hover:bg-gray-100 transition-all">
            <Image src="/file-icon.svg" alt="File Icon" width={20} height={20} />
            Download as PDF
          </button>
        </div>

        {/* Paper Container */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-16 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-5 pb-12">
            <h2 className="text-3xl font-extrabold text-[#2D2D2D] mb-2 uppercase tracking-tight">Delhi Public School, Sector-4, Bokaro</h2>
            <h3 className="text-2xl font-bold text-gray-700 mb-1">Subject: Science</h3>
            <h3 className="text-2xl font-bold text-gray-700 mb-1">Class: 5th</h3>
          </div>

          {/* Paper Meta */}
          <div className="flex justify-between items-center mb-8 px-4">
            <div className="font-bold text-sm text-[#2D2D2D]">Time Allowed: 45 minutes</div>
            <div className="font-bold text-sm text-[#2D2D2D]">Maximum Marks:20</div>
          </div>

          <p className="text-black text-sm font-bold mb-10 px-4">All questions are compulsory unless stated otherwise.</p>

          {/* Student Fields */}
          <div className="grid grid-cols-1 gap-y-1 mb-16 px-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-black">Name:</span>
              <div className="w-40 border-b border-black h-5"></div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-black">Roll Number:</span>
              <div className="w-40 border-b border-black h-5"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-black">Class:</span>
              <span className="text-xs font-bold">8th Section:</span>
              <div className="w-40 border-b border-black h-5"></div>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block pb-2 px-8">
              <h4 className="text-2xl font-black tracking-tight">Section A</h4>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3 mb-5 px-4">
            <div className="mb-6">
              <h5 className="font-bold text-sm text-[#2D2D2D] mb-1">Short Answer Questions</h5>
              <p className="text-xs font-light italic text-black">Attempt all questions. Each question carries 2 marks</p>
            </div>

            {QUESTIONS.map((q, idx) => (
              <div key={q.id} className="flex gap-4 group">
                <span className="font-light text-lg text-black min-w-[24px]">{idx + 1}.</span>
                <div className="flex-1">
                  <div className="text-base leading-relaxed text-black font-light">
                    <span className="text-base font-light mr-2">
                      [{q.difficulty}]
                    </span>
                    {q.text} <span className="text-black text-base ml-2">[{q.marks} Marks]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-20 px-4">
            
            <span className="text-base font-bold tracking-tight">End of Question Paper</span>
           
          </div>

          {/* Answer Key */}
          <div className="px-4">
            <div className="flex items-center gap-3 mb-4">
              
              <h4 className="text-xl font-bold">Answer Key:</h4>
            </div>

            <div className="space-y-3">
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="flex gap-4">
                  <span className="font-light text-base text-black">{idx + 1}.</span>
                  <div className="flex-1">
                    <p className="text-base font-light leading-relaxed text-black">
                      {q.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      </div>
      
    </div>
  );
};

export default QuestionPaper;