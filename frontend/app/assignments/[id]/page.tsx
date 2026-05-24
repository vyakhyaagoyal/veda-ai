"use client";

import React, { useEffect, useState } from "react";

import { Loader2, Download, RotateCcw } from "lucide-react";

import { useParams } from "next/navigation";

import { paperService } from "@/services/paper.service";

import { useGenerationSocket } from "@/hooks/useGenerationSocket";

// --- Types ---
export interface Question {
  question: string;

  difficulty: "easy" | "medium" | "hard";

  marks: number;

  answer?: string;
}

export interface Section {
  title: string;

  instruction: string;

  questions: Question[];
}

export interface GeneratedPaper {
  sections: Section[];
}

const QuestionPaper = () => {
  const params = useParams();

  const assignmentId = params.id as string;

  const [assignment, setAssignment] = useState<any>(null);
const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAssignment = async () => {
    try {
      const data = await paperService.getAssignment(assignmentId);

      setAssignment(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  useGenerationSocket({
  assignmentId,

  onComplete: fetchAssignment,

  onFailed: () => {
    setError(
      "Generation failed"
    );
  },
});

  if (loading || !assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <Loader2 className="animate-spin text-black" />
      </div>
    );
  }

  if (assignment.status === "generating") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9]">
        <Loader2 className="animate-spin text-black mb-6" />

        <h2 className="text-3xl font-bold">Generating Question Paper</h2>

        <p className="text-zinc-500 mt-4">AI is preparing your assessment...</p>
      </div>
    );
  }

  if (
  assignment.status ===
  "queued"
) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9]">
      <Loader2 className="animate-spin mb-6" />

      <h2 className="text-3xl font-bold">
        Queued for Generation
      </h2>

      <p className="text-zinc-500 mt-4">
        Waiting for worker...
      </p>
    </div>
  );
}

if (
  assignment.status ===
  "generating"
) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9]">
      <Loader2 className="animate-spin mb-6" />

      <h2 className="text-3xl font-bold">
        Generating Question Paper
      </h2>

      <p className="text-zinc-500 mt-4">
        AI is preparing your
        assessment...
      </p>
    </div>
  );
}

if (
  assignment.status ===
  "failed"
) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9]">
      <h2 className="text-3xl font-bold text-red-500">
        Generation Failed
      </h2>

      <p className="text-zinc-500 mt-4">
        Please regenerate the
        assignment.
      </p>
    </div>
  );
}

  return (
    
    <div className="min-h-screen bg-[#F3F4F6]/50 font-sans text-[#2D2D2D]">
      <div className="max-w-8xl mx-auto rounded-2xl bg-black/60">
        <main className="w-full mx-auto py-4 px-4">
          {/* AI Assistant Banner */}
          <div className="flex flex-col bg-black/70 rounded-3xl p-6 mb-4 items-start justify-start shadow-lg">
            <div className="flex items-center gap-4">
              <p className="text-white/90 text-md mb-3 font-medium leading-relaxed">
                Certainly, Lakshya! Here are customized Question Paper for your
                CBSE Grade 8 Science classes on the NCERT chapters:
              </p>
            </div>
            
            <button
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_API_URL}/assignments/${assignmentId}/pdf`,
                )
              }
              className="flex items-center gap-2 px-6 py-3 bg-white text-[#111827] rounded-full font-semibold text-sm hover:bg-gray-100 transition-all"
            >
              <Download size={18} />
              Download as PDF
            </button>

            <button
              onClick={async () => {
                await paperService.regeneratePaper(assignmentId);

                fetchAssignment();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold text-sm hover:bg-orange-600 transition-all"
            >
              <RotateCcw size={18} />
              Regenerate
            </button>
          </div>

          {/* Paper Container */}
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-16 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-5 pb-12">
              <h2 className="text-3xl font-extrabold text-[#2D2D2D] mb-2 uppercase tracking-tight">
                Delhi Public School, Sector-4, Bokaro
              </h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-1">
                Subject: Science
              </h3>
              <h3 className="text-2xl font-bold text-gray-700 mb-1">
                Class: 5th
              </h3>
            </div>

            {/* Paper Meta */}
            <div className="flex justify-between items-center mb-8 px-4">
              <div className="font-bold text-sm text-[#2D2D2D]">
                Time Allowed: 45 minutes
              </div>
              <div className="font-bold text-sm text-[#2D2D2D]">
                Maximum Marks:20
              </div>
            </div>

            <p className="text-black text-sm font-bold mb-10 px-4">
              All questions are compulsory unless stated otherwise.
            </p>

            {/* Student Fields */}
            <div className="grid grid-cols-1 gap-y-1 mb-16 px-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-black">Name:</span>
                <div className="w-40 border-b border-black h-5"></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-black">
                  Roll Number:
                </span>
                <div className="w-40 border-b border-black h-5"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-black">Class:</span>
                <span className="text-xs font-bold">8th Section:</span>
                <div className="w-40 border-b border-black h-5"></div>
              </div>
            </div>

            {/* Section Header */}
            {/* <div className="text-center mb-12">
            <div className="inline-block pb-2 px-8">
              <h4 className="text-2xl font-black tracking-tight">Section A</h4>
            </div>
          </div> */}

            {/* Questions List */}
            {/* <div className="space-y-3 mb-5 px-4">
              <div className="mb-6">
                <h5 className="font-bold text-sm text-[#2D2D2D] mb-1">
                  Short Answer Questions
                </h5>
                <p className="text-xs font-light italic text-black">
                  Attempt all questions. Each question carries 2 marks
                </p>
              </div>

              {assignment.generatedPaper?.sections?.map(
                (section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="mb-14">
                    
                    <div className="text-center mb-12">
                      <div className="inline-block pb-2 px-8">
                        <h4 className="text-2xl font-black tracking-tight">
                          {section.title}
                        </h4>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="font-bold text-sm text-[#2D2D2D] mb-1">
                        {section.instruction}
                      </h5>
                    </div>

                    <div className="space-y-5">
                      {section.questions.map((q: any, idx: number) => (
                        <div key={idx} className="flex gap-4">
                          <span className="font-light text-lg text-black min-w-[24px]">
                            {idx + 1}.
                          </span>

                          <div className="flex-1">
                            <div className="text-base leading-relaxed text-black font-light">
                              <span
                                className={`mr-2 px-2 py-1 rounded-full text-xs font-semibold ${
                                  q.difficulty === "easy"
                                    ? "bg-green-100 text-green-700"
                                    : q.difficulty === "medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {q.difficulty}
                              </span>

                              {q.question}

                              <span className="ml-3 font-semibold">
                                [{q.marks} Marks]
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div> */}

            <div className="mb-20 px-4">
              <span className="text-base font-bold tracking-tight">
                End of Question Paper
              </span>
            </div>

            {/* Answer Key */}
            <div className="px-4">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-xl font-bold">Answer Key:</h4>
              </div>

              <div className="space-y-3">
                {assignment.generatedPaper?.sections?.flatMap(
  (section: any) => section.questions
).map((q: any, idx: number) => (
                  <div key={q.id} className="flex gap-4">
                    <span className="font-light text-base text-black">
                      {idx + 1}.
                    </span>
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
