"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateAssignmentStore } from "@/store/create-assignment.store";

import { validateAssignment } from "@/lib/validators/create-assignment.validator";

import { Calendar } from "@/components/ui/calendar";

import {
  useAuthStore,
} from "@/store/auth.store";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";

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

import { useRef } from "react";
import { generationService } from "@/services/generation.service";
import { toast } from "sonner";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState("");

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition is not supported in this browser.");

      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.start();

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");

      setAdditionalInfo(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

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

  const router = useRouter();

  const {
    dueDate,
    setDueDate,

    additionalInfo,
    setAdditionalInfo,

    rows,
    setRows,

    loading,
    setLoading,

    progress,
    setProgress,
  } = useCreateAssignmentStore();

  const handleGenerate = async () => {
    const errors = validateAssignment({
      dueDate,
      rows,
      additionalInfo,
      uploadedFiles,
    });

    if (errors.length > 0) {
      setValidationError(errors.join(", "));

      setTimeout(() => {
        setValidationError("");
      }, 3000);

      return;
    }

    try {
      setLoading(true);
      setProgress(3);

      const formData = new FormData();

      formData.append("dueDate", dueDate);

      formData.append("additionalInfo", additionalInfo);

      formData.append("rows", JSON.stringify(rows));

      if (uploadedFiles.length > 0) {
        formData.append("file", uploadedFiles[0]);
      }

      const response = await generationService.createAssignment( {...formData,
    });

      setProgress(4);

      router.push(`/assignments/${response.assignmentId}`);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to generate assignment",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Derived State (Totals) ---
  const totalQuestions = useMemo(
    () => rows.reduce((acc, row) => acc + row.count, 0),
    [rows],
  );
  const totalMarks = useMemo(
    () => rows.reduce((acc, row) => acc + row.count * row.marks, 0),
    [rows],
  );

  return (
    <>
      {validationError && (
        <div className="fixed inset-0 z-[100] bg-opacity-50 flex items-center justify-center pointer-events-none">
          <div className="bg-black text-white px-8 py-4 rounded-2xl shadow-2xl text-sm font-semibold animate-in fade-in zoom-in duration-200">
            <div className="space-y-2">
              {validationError.split(",").map((error, index) => (
                <p key={index}>• {error}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen text-[#2D2D2D] p-2 lg:p-2"
      //bg-[#F3F4F6]/30
      >
        {/* Header */}
        <header
          className="
    max-w-6xl
    mx-auto
    mb-6
    lg:mb-8
    px-1
    sm:px-0
  "
        >
          <div
            className="
    relative

    flex
    items-center
    justify-center
    sm:justify-start

    gap-3
    mb-2
  "
          >
            {/* Mobile Back Button */}
            <button
              onClick={() => router.back()}
              className="
      sm:hidden

      absolute
      left-0

      w-10
      h-10

      rounded-full

      bg-white
      border
      border-zinc-200/70

      flex
      items-center
      justify-center

      shadow-sm

      active:scale-95
      transition-all
    "
            >
              <ArrowLeft size={18} className="text-[#2D2D2D]" />
            </button>
            {/* Green Dot */}
            <div
              className="hidden
    sm:block w-4 h-4 bg-green-200 rounded-full flex items-center justify-center"
            >
              <div
                className="hidden
    sm:block w-2 h-2 bg-green-500 rounded-full ml-1 mt-1"
              ></div>
            </div>
            <h1
              className="
    text-xl
    font-bold
    tracking-tight

    text-center
    sm:text-left
  "
            >
              Create Assignment
            </h1>
          </div>
          <p
            className="
    hidden
    sm:block

    text-gray-400
    text-sm
    mb-6
  "
          >
            Set up a new assignment for your students
          </p>
        </header>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  progress >= item * 2 ? "bg-[#2D2D2D]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <main
          className="
    max-w-4xl
    mx-auto
    bg-[#F3F4F6]/90
    rounded-[28px]
    lg:rounded-[40px]
    shadow-sm
    border-2
    lg:border-4
    border-white
    p-4
    sm:p-6
    lg:p-10
    mb-8
  "
  //bg-[#F3F4F6]/90
        >
          <div className="mb-10">
            <h2
              className="
    text-[20px]
    sm:text-[22px]
    lg:text-2xl
    font-bold
    mb-1
  "
            >
              Assignment Details
            </h2>
            <p className="text-gray-500 text-sm">
              Basic information about your assignment
            </p>
          </div>

          {/* Upload Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();

              const files = Array.from(e.dataTransfer.files);

              if (files.length > 0) {
                setUploadedFiles((prev) => [...prev, ...files]);
                setProgress(2);
              }
            }}
            className="
  border-2
  border-dashed
  border-gray-300
  bg-white
  rounded-[24px]
  lg:rounded-[32px]
  p-5
  sm:p-7
  mb-5

  flex
  flex-col
  items-center
  justify-center
  text-center
"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CloudUpload className="text-black" size={30} />
            </div>

            <p
              className="
    text-[15px]
    sm:text-[17px]
    lg:text-lg
    font-semibold
    mb-1
  "
            >
              Choose a file or drag & drop it here
            </p>

            <p
              className="
  text-gray-500
  text-[11px]
  sm:text-sm
  mb-6
  uppercase
  tracking-wider
"
            >
              JPEG, PNG, upto 10MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.png,.jpg,.jpeg"
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files || []);

                if (files.length > 0) {
                  setUploadedFiles((prev) => [...prev, ...files]);
                  setProgress(2);
                }
              }}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-full transition-all border border-gray-100 cursor-pointer"
            >
              {uploadedFiles.length > 0 ? "Browse More" : "Browse Files"}
            </div>
          </div>

          <p className="text-center text-gray-500 text-lg font-medium mb-5">
            Upload images of your preferred document/image
          </p>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3 mb-8">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-5 py-3 mb-2"
                >
                  <p className="text-sm text-gray-600 font-medium truncate">
                    {file.name}
                  </p>

                  <button
                    onClick={() => {
                      setUploadedFiles((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                    }}
                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} className="cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Due Date */}
          <div className="mb-12">
            <label className="block text-sm font-bold mb-3">Due Date</label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`w-full flex items-center justify-between border-2 border-gray-200 rounded-full
px-4
sm:px-6
py-3
sm:py-4 bg-white hover:border-gray-300 transition-all ${
                    dueDate ? "text-black" : "text-gray-400"
                  }`}
                >
                  <span className="font-medium">
                    {dueDate ? format(new Date(dueDate), "PPP") : "DD-MM-YYYY"}
                  </span>

                  <Image
                    src="/calendar-icon.svg"
                    alt="Calendar"
                    height={25}
                    width={25}
                  />
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0 rounded-3xl border-none shadow-2xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dueDate ? new Date(dueDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setDueDate(date.toISOString());
                    }
                  }}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Questions Section */}
          <div className="mb-6">
            <div
              className="
    grid
    grid-cols-1
    md:grid-cols-12

    gap-3
    md:gap-4

    mb-4
    px-2
  "
            >
              <div
                className="
    md:col-span-7

    font-bold
    tracking-widest
    text-black

    text-[14px]
    sm:text-sm

    mb-1
    md:mb-3
  "
              >
                Question Type
              </div>
              <div className="hidden sm:block col-span-3 text-sm font-bold tracking-widest text-black text-center">
                No. of Questions
              </div>
              <div className="hidden sm:block col-span-2 text-sm font-bold tracking-widest text-black text-center">
                Marks
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="
  bg-white
  md:bg-transparent
  rounded-[28px]
  md:rounded-none
  p-5
  md:p-0
  border
  md:border-0
  border-gray-100
  grid
  grid-cols-1
  md:grid-cols-12
  gap-4
  md:gap-2
  items-center
"
                >
                  {/* Type Select */}
                  <div
                    className="
  md:col-span-7
  flex
  items-center
  gap-3
"
                  >
                    <div className="relative flex-1">
                      <div className="relative flex-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center justify-between bg-white sm:border sm:border-gray-200 rounded-full px-5 py-3.5 focus:outline-none focus:border-gray-300 font-semibold text-[12px] sm:text-sm transition-all">
                              <span>{row.type}</span>

                              <ChevronDown className="text-black" size={18} />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="start"
                            className="w-62.5 rounded-2xl p-2"
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

                  {/* Mobile Counter Card */}
<div
  className="
    md:hidden

    bg-[#F5F5F5]

    rounded-[24px]

    px-4
    py-4

    grid
    grid-cols-2

    gap-4
  "
>
  {/* Questions */}
  <div>
    <p
      className="
        text-[11.5px]
        font-semibold
        text-[#2D2D2D]

        mb-3

        text-center
      "
    >
      No. of Questions
    </p>

    <div
      className="
        flex
        items-center
        justify-between

        bg-white

        rounded-full

        px-2
        py-1.5
      "
    >
      <button
        onClick={() =>
          adjustCounter(
            row.id,
            "count",
            -1
          )
        }
        className="
          w-8
          h-8

          flex
          items-center
          justify-center

          text-zinc-500
        "
      >
        —
      </button>

      <span
        className="
          text-[18px]
          font-bold
          text-[#2D2D2D]
        "
      >
        {row.count}
      </span>

      <button
        onClick={() =>
          adjustCounter(
            row.id,
            "count",
            1
          )
        }
        className="
          w-8
          h-8

          flex
          items-center
          justify-center

          text-zinc-500
        "
      >
        +
      </button>
    </div>
  </div>

  {/* Marks */}
  <div>
    <p
      className="
        text-[11.5px]
        font-semibold
        text-[#2D2D2D]

        mb-3

        text-center
      "
    >
      Marks
    </p>

    <div
      className="
        flex
        items-center
        justify-between

        bg-white

        rounded-full

        px-2
        py-1.5
      "
    >
      <button
        onClick={() =>
          adjustCounter(
            row.id,
            "marks",
            -1
          )
        }
        className="
          w-8
          h-8

          flex
          items-center
          justify-center

          text-zinc-500
        "
      >
        —
      </button>

      <span
        className="
          text-[18px]
          font-bold
          text-[#2D2D2D]
        "
      >
        {row.marks}
      </span>

      <button
        onClick={() =>
          adjustCounter(
            row.id,
            "marks",
            1
          )
        }
        className="
          w-8
          h-8

          flex
          items-center
          justify-center

          text-zinc-500
        "
      >
        +
      </button>
    </div>
  </div>
</div>

                  {/* Desktop Question Count */}
                  <div className="hidden md:flex md:col-span-3 items-center justify-center">
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

                  {/* Desktop Marks Count */}
                  <div className="hidden md:flex md:col-span-2 items-center justify-center">
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
              className="flex cursor-pointer items-center gap-2 px-1 text-sm font-bold text-[#2D2D2D] hover:bg-gray-50 rounded-2xl transition-colors"
            >
              <div className="w-10 h-10 bg-[#2D2D2D] rounded-full flex items-center justify-center text-white">
                <Plus size={20} strokeWidth={3} />
              </div>
              Add Question Type
            </button>
          </div>

          {/* Totals */}
          <div
            className="
  flex
  flex-col
  items-end
  gap-2
  mb-8
  pr-1
"
          >
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
                className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-[24px]
lg:rounded-[32px]
p-4
sm:p-6 focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]/5 font-medium text-gray-600 resize-none"
              />
              <button
                onClick={startListening}
                type="button"
                className={`absolute right-4
sm:right-8
bottom-4
sm:bottom-8 p-3 bg-white rounded-full border border-gray-100 transition-all ${
                  isListening ? "scale-110 bg-red-50" : ""
                }`}
              >
                <Mic
                  size={20}
                  className={isListening ? "text-red-500" : "text-black"}
                />
              </button>
              {/* {isListening && (
  <p className="text-sm text-red-500 mt-3 font-medium animate-pulse">
    Listening...
  </p>
)} */}
            </div>
          </div>
        </main>

        {/* Navigation Buttons */}
        <div
          className="
  max-w-5xl
  mx-auto

  flex
  items-center

  justify-center
  sm:justify-between

  gap-3
  sm:gap-4

  px-2
  sm:px-4

  pb-28
  md:pb-6
"
        >
          <button
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-3 px-5
sm:px-8
py-3
sm:py-3.5 bg-white border border-gray-100 rounded-full font-bold text-sm shadow-sm hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={18} />
            Previous
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex cursor-pointer items-center gap-3 px-5
sm:px-8
py-3
sm:py-3.5 bg-[#111827] text-white rounded-full font-bold text-sm shadow-lg hover:bg-black transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>Generating...</>
            ) : (
              <>
                Next
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAssignment;
