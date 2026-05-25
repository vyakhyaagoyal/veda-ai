"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  Download,
  RotateCcw,
} from "lucide-react";

import { useParams }
from "next/navigation";

import { paperService }
from "@/services/paper.service";

import { useGenerationSocket }
from "@/hooks/useGenerationSocket";

export interface Question {
  question: string;

  difficulty:
    | "easy"
    | "medium"
    | "hard";

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

  const assignmentId =
    params.id as string;

  const [
    assignment,
    setAssignment,
  ] = useState<any>(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const fetchAssignment =
    async () => {
      setLoading(true);

      try {
        const data =
          await paperService.getAssignment(
            assignmentId
          );

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

    onComplete:
      fetchAssignment,

    onFailed: () => {
      setError(
        "Generation failed"
      );
    },
  });

  // =========================
  // LOADING
  // =========================

  if (loading || !assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] px-4">
        <Loader2 className="animate-spin text-black w-7 h-7" />
      </div>
    );
  }

  // =========================
  // QUEUED
  // =========================

  if (assignment.status === "queued") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] px-6 text-center">
        <Loader2 className="animate-spin mb-6 w-8 h-8" />

        <h2 className="text-2xl sm:text-3xl font-bold">
          Queued for Generation
        </h2>

        <p className="text-zinc-500 mt-4 text-sm sm:text-base">
          Waiting for worker...
        </p>
      </div>
    );
  }

  // =========================
  // GENERATING
  // =========================

  if (
    assignment.status ===
    "generating"
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] px-6 text-center">
        <Loader2 className="animate-spin mb-6 w-8 h-8" />

        <h2 className="text-2xl sm:text-3xl font-bold">
          Generating Question
          Paper
        </h2>

        <p className="text-zinc-500 mt-4 text-sm sm:text-base">
          AI is preparing your
          assessment...
        </p>
      </div>
    );
  }

  // =========================
  // FAILED
  // =========================

  if (
    assignment.status ===
    "failed"
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-500">
          Generation Failed
        </h2>

        <p className="text-zinc-500 mt-4 text-sm sm:text-base">
          {assignment.failureReason ||
            error ||
            "Please regenerate the assignment."}
        </p>
      </div>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (
    !assignment
      .generatedPaper
      ?.sections?.length
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <p>
          No questions generated.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]/50 text-[#2D2D2D] pb-32 md:pb-10">
      <div className="w-full max-w-[1600px] mx-auto">
        <main className="w-full py-3 sm:py-4 px-2 sm:px-4">
          {/* Banner */}

          <div
            className="
              flex
              flex-col
              bg-black/80
              rounded-[28px]
              sm:rounded-[36px]
              p-4
              sm:p-6
              mb-4
              shadow-lg
            "
          >
            <p
              className="
                text-white/90
                text-sm
                sm:text-base
                mb-5
                font-medium
                leading-relaxed
              "
            >
              Certainly,{" "}
              {assignment.teacherName ||
                "Teacher"}
              ! Here are customized
              Question Papers for
              your students.
            </p>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
              "
            >
              {/* PDF */}

              <button
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_API_URL}/assignments/${assignmentId}/pdf`
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  bg-white
                  text-[#111827]
                  rounded-full
                  font-semibold
                  text-sm
                  hover:bg-gray-100
                  transition-all
                "
              >
                <Download size={17} />

                Download as PDF
              </button>

              {/* Regenerate */}

              <button
                onClick={async () => {
                  await paperService.regeneratePaper(
                    assignmentId
                  );

                  setAssignment(
                    (
                      prev: any
                    ) => ({
                      ...prev,

                      status:
                        "queued",
                    })
                  );
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  bg-orange-500
                  text-white
                  rounded-full
                  font-semibold
                  text-sm
                  hover:bg-orange-600
                  transition-all
                "
              >
                <RotateCcw
                  size={17}
                />

                Regenerate
              </button>
            </div>
          </div>

          {/* Paper */}

          <div
            className="
              bg-white
              rounded-[28px]
              lg:rounded-[40px]
              shadow-sm
              border
              border-gray-100
              p-5
              sm:p-8
              lg:p-16
              overflow-hidden
            "
          >
            {/* Header */}

            <div className="text-center mb-8 sm:mb-12">
              <h2
                className="
                  text-[22px]
                  sm:text-[28px]
                  lg:text-3xl
                  font-extrabold
                  text-[#2D2D2D]
                  mb-2
                  uppercase
                  tracking-tight
                  leading-tight
                "
              >
                Delhi Public
                School,
                Sector-4, Bokaro
              </h2>

              <h3
                className="
                  text-[18px]
                  sm:text-[22px]
                  font-bold
                  text-gray-700
                  mb-1
                "
              >
                {assignment.title}
              </h3>

              <h3
                className="
                  text-[16px]
                  sm:text-[20px]
                  font-bold
                  text-gray-700
                "
              >
                Class: 5th
              </h3>
            </div>

            {/* Meta */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-2
                sm:gap-0
                justify-between
                items-start
                sm:items-center
                mb-8
              "
            >
              <div className="font-bold text-sm">
                Time Allowed: 45
                minutes
              </div>

              <div className="font-bold text-sm">
                Maximum Marks: 20
              </div>
            </div>

            <p
              className="
                text-black
                text-sm
                font-bold
                mb-10
              "
            >
              All questions are
              compulsory unless
              stated otherwise.
            </p>

            {/* Student Fields */}

            <div
              className="
                grid
                grid-cols-1
                gap-y-4
                mb-14
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-black whitespace-nowrap">
                  Name:
                </span>

                <div className="flex-1 border-b border-black h-5"></div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-black whitespace-nowrap">
                  Roll Number:
                </span>

                <div className="flex-1 border-b border-black h-5"></div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-black">
                  Class:
                </span>

                <span className="text-xs font-bold">
                  8th Section:
                </span>

                <div className="flex-1 min-w-[120px] border-b border-black h-5"></div>
              </div>
            </div>

            {/* Questions */}

            <div className="space-y-10">
              {assignment.generatedPaper?.sections?.map(
                (
                  section: any,
                  sectionIndex: number
                ) => (
                  <div
                    key={
                      sectionIndex
                    }
                  >
                    {/* Section Title */}

                    <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-block">
                        <h4
                          className="
                            text-[22px]
                            sm:text-[28px]
                            font-black
                            tracking-tight
                          "
                        >
                          {
                            section.title
                          }
                        </h4>
                      </div>
                    </div>

                    {/* Instruction */}

                    <div className="mb-6">
                      <h5 className="font-bold text-sm text-[#2D2D2D] mb-1">
                        {
                          section.instruction
                        }
                      </h5>
                    </div>

                    {/* Questions */}

                    <div className="space-y-5">
                      {section.questions.map(
                        (
                          q: any,
                          idx: number
                        ) => (
                          <div
                            key={
                              idx
                            }
                            className="
                              flex
                              items-start
                              gap-3
                            "
                          >
                            <span
                              className="
                                font-light
                                text-base
                                sm:text-lg
                                text-black
                                min-w-[22px]
                              "
                            >
                              {idx +
                                1}
                              .
                            </span>

                            <div className="flex-1">
                              <div
                                className="
                                  text-[15px]
                                  sm:text-base
                                  leading-relaxed
                                  text-black
                                  font-light
                                "
                              >
                                <span className="px-2 py-1 rounded-full text-sm sm:text-base">
                                  [
                                  {
                                    q.difficulty
                                  }
                                  ]
                                </span>

                                {
                                  q.question
                                }

                                <span className="ml-1 font-light whitespace-nowrap">
                                  [
                                  {
                                    q.marks
                                  }{" "}
                                  Marks]
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Footer */}

            <div className="mt-16 mb-16">
              <span className="text-base font-bold tracking-tight">
                End of Question
                Paper
              </span>
            </div>

            {/* Answer Key */}

            <div>
              <div className="flex items-center gap-3 mb-6">
                <h4
                  className="
                    text-[20px]
                    sm:text-xl
                    font-bold
                  "
                >
                  Answer Key:
                </h4>
              </div>

              <div className="space-y-5">
                {assignment.generatedPaper?.sections
                  ?.flatMap(
                    (
                      section: any
                    ) =>
                      section.questions
                  )
                  .map(
                    (
                      q: any,
                      idx: number
                    ) => (
                      <div
                        key={
                          idx
                        }
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span className="font-light text-sm sm:text-base text-black">
                          {idx +
                            1}
                          .
                        </span>

                        <div className="flex-1">
                          <p
                            className="
                              text-sm
                              sm:text-base
                              font-light
                              leading-relaxed
                              text-black
                            "
                          >
                            {
                              q.answer
                            }
                          </p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuestionPaper;