"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  X,
  CloudUpload,
  ChevronDown,
  Mic,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
interface QuestionRow {
  id: string;
  type: string;
  count: number;
  marks: number;
}

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "Essay Type Questions",
  "True/False",
];

const CreateAssignment = () => {
  // --- State ---
  const [dueDate, setDueDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [rows, setRows] = useState<QuestionRow[]>([
    { id: "1", type: "Multiple Choice Questions", count: 4, marks: 1 },
    { id: "2", type: "Short Questions", count: 3, marks: 2 },
    { id: "3", type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
    { id: "4", type: "Numerical Problems", count: 5, marks: 5 },
  ]);

  // --- Derived State (Totals) ---
  const totalQuestions = rows.reduce((acc, row) => acc + row.count, 0);
  const totalMarks = rows.reduce((acc, row) => acc + row.count * row.marks, 0);

  // --- Handlers ---
  const addRow = () => {
    const newRow: QuestionRow = {
      id: Math.random().toString(36).substr(2, 9),
      type: QUESTION_TYPES[0],
      count: 1,
      marks: 1,
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof QuestionRow, value: any) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const adjustCounter = (
    id: string,
    field: "count" | "marks",
    delta: number,
  ) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          const newValue = Math.max(0, (row[field] as number) + delta);
          return { ...row, [field]: newValue };
        }
        return row;
      }),
    );
  };

  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#F3F4F6]/30 text-[#2D2D2D] p-2 lg:p-2">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          {/* Green Dot */}
          <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Create Assignment
          </h1>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Set up a new assignment for your students
        </p>

        </header>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-3 max-w-4xl p-2 mx-auto mb-8">
          {/* Step 1 */}
          <div
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              step >= 1 ? "bg-gray-600" : "bg-gray-200"
            }`}
          />

          {/* Step 2 */}
          <div
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              step >= 2 ? "bg-gray-600" : "bg-gray-200"
            }`}
          />
        </div>
      

      {/* Main Form Card */}
      <main className="max-w-4xl mx-auto bg-[#F3F4F6]/90 rounded-[40px] shadow-sm border-4 border-white p-6 lg:p-10 mb-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-1">Assignment Details</h2>
          <p className="text-gray-500 text-sm">
            Basic information about your assignment
          </p>
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-gray-300 bg-white rounded-[32px] p-7 mb-5 flex flex-col items-center justify-center text-center group hover:border-gray-300 transition-colors cursor-pointer">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CloudUpload className="text-black" size={30} />
          </div>
          <p className="text-lg font-semibold mb-1">
            Choose a file or drag & drop it here
          </p>
          <p className="text-gray-500 text-light mb-6 uppercase tracking-wider">
            JPEG, PNG, upto 10MB
          </p>
          <button className="px-8 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-full transition-all border border-gray-100">
            Browse Files
          </button>
        </div>
        <p className="text-center text-gray-500 text-lg font-medium mb-12">
          Upload images of your preferred document/image
        </p>

        {/* Due Date */}
        <div className="mb-12">
          <label className="block text-sm font-bold mb-3">Due Date</label>
          <div className="relative max-w-full">
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]/5 font-medium text-gray-600"
            />
            <Image
              src="/calendar-icon.svg"
              alt="Calendar"
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
              height={30}
              width={30}
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="mb-6">
          <div className="grid grid-cols-12 gap-4 mb-4 px-2">
            <div className="col-span-7 font-bold tracking-widest text-black block text-sm mb-3">
              Question Type
            </div>
            <div className="col-span-3 text-sm font-bold tracking-widest text-black text-center">
              No. of Questions
            </div>
            <div className="col-span-2 text-sm font-bold tracking-widest text-black text-center">
              Marks
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                {/* Type Select */}
                <div className="col-span-7 flex items-center gap-3">
                  <div className="relative flex-1">
                    <div className="relative flex-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:border-gray-300 font-semibold text-sm transition-all">
                            <span>{row.type}</span>

                            <ChevronDown className="text-black" size={18} />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="start"
                          className="w-[250px] rounded-2xl p-2"
                        >
                          {QUESTION_TYPES.map((t) => (
                            <DropdownMenuItem
                              key={t}
                              onClick={() => updateRow(row.id, "type", t)}
                              className="rounded-xl cursor-pointer py-3 font-medium"
                            >
                              {t}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <button
                    onClick={() => removeRow(row.id)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X size={20} className="text-black" />
                  </button>
                </div>

                {/* Question Count */}
                <div className="col-span-3 flex items-center justify-center">
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full p-1">
                    <button
                      onClick={() => adjustCounter(row.id, "count", -1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-gray-600"
                    >
                      —
                    </button>
                    <span className="w-5 text-center font-bold text-sm">
                      {row.count}
                    </span>
                    <button
                      onClick={() => adjustCounter(row.id, "count", 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Marks Count */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full p-1">
                    <button
                      onClick={() => adjustCounter(row.id, "marks", -1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-gray-600"
                    >
                      —
                    </button>
                    <span className="w-5 text-center font-bold text-sm">
                      {row.marks}
                    </span>
                    <button
                      onClick={() => adjustCounter(row.id, "marks", 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addRow}
            className="flex items-center gap-2 px-1 text-sm font-bold text-[#2D2D2D] hover:bg-gray-50 rounded-2xl transition-colors"
          >
            <div className="w-10 h-10 bg-[#2D2D2D] rounded-full flex items-center justify-center text-white">
              <Plus size={20} strokeWidth={3} />
            </div>
            Add Question Type
          </button>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end gap-2 mb-8 px-2">
          <p className="text-lg text-black">
            Total Questions :{" "}
            <span className="text-[#2D2D2D] ml-1">{totalQuestions}</span>
          </p>
          <p className="text-lg text-black">
            Total Marks :{" "}
            <span className="text-[#2D2D2D] ml-1">{totalMarks}</span>
          </p>
        </div>

        {/* Additional Info */}
        <div className="">
          <label className="block text-md font-bold mb-4">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-[32px] p-6 focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]/5 font-medium text-gray-600 resize-none"
            />
            <button className="absolute right-8 bottom-8 p-3 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-[#2D2D2D] transition-colors">
              <Mic size={20} className="text-black" />
            </button>
          </div>
        </div>
      </main>

      {/* Navigation Buttons */}
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          className="flex items-center gap-3 px-8 py-3.5 bg-white border border-gray-100 rounded-full font-bold text-sm shadow-sm hover:bg-gray-50 transition-all"
        >
          <ArrowLeft size={18} />
          Previous
        </button>
        <button
          onClick={() => setStep((prev) => Math.min(prev + 1, 2))}
          className="flex items-center gap-3 px-8 py-3.5 bg-[#111827] text-white rounded-full font-bold text-sm shadow-lg hover:bg-black transition-all group"
        >
          Next
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default CreateAssignment;
