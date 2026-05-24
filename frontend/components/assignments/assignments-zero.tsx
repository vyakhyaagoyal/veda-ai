import React from 'react';
import {  Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AssignmentsZeroProps {
  onCreate: () => void;
}

const MainContent = (
    {
  onCreate,
}: AssignmentsZeroProps) => {
  return (
    <main className="flex-1 bg-[#F9F9F9] flex flex-col items-center justify-center text-center">
      <div className="max-w-lg flex flex-col items-center">
        {/* Illustration Placeholder */}
        <div className="relative mb-6 transform scale-110">
          {/* Mocking the complex illustration from the screenshot with layered SVGs */}
          <div className="relative w-60 h-60 flex items-center justify-center">
             
            <Image src="/illustrations.svg" alt="No Assignments" width={256} height={256} loading="eager"/>
          </div>
        </div>

        <h2 className="text-[22px] font-bold text-[#2D2D2D]">
          No assignments yet
        </h2>
        
        <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Create your first assignment to start collecting and grading student submissions. 
          You can set up rubrics, define marking criteria, and let AI assist with grading.
        </p>

<Link href="/assignments/create">
        <button
          onClick={onCreate}
          className="bg-[#111111] cursor-pointer hover:bg-black text-white px-8 py-3 rounded-full flex items-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gray-200"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="font-light tracking-tight">Create Your First Assignment</span>
        </button>
        </Link>
      </div>
    </main>
  );
};

export default MainContent;
