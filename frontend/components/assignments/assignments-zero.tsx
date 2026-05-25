"use client";

import React from "react";

import {
  Plus,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

interface AssignmentsZeroProps {
  onCreate: () => void;
}

const MainContent = ({
  onCreate,
}: AssignmentsZeroProps) => {
  return (
    <main
      className="
        flex-1
        
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-5
        sm:px-8
        py-16
        min-h-[calc(100vh-80px)]
      "
      // bg-[#F9F9F9]
    >
      <div
        className="
          w-full
          max-w-[680px]
          flex
          flex-col
          items-center
        "
      >
        {/* Illustration */}
        <div
          className="
            relative
            mb-7
            sm:mb-8
            flex
            items-center
            justify-center
          "
        >
          <Image
            src="/Illustrations.svg"
            alt="No Assignments"
            width={260}
            height={260}
            priority
            className="
              w-[180px]
              sm:w-[220px]
              md:w-[260px]
              h-auto
              object-contain
            "
          />
        </div>

        {/* Heading */}
        <h2
          className="
            text-[20px]
sm:text-[24px]
md:text-[34px]
            font-bold
            tracking-tight
            text-[#2D2D2D]
            leading-tight
          "
        >
          No assignments yet
        </h2>

        {/* Description */}
        <p
          className="
            text-zinc-500
            text-[12px]
sm:text-[14px]
md:text-[16px]
px-2 sm:px-0
            leading-relaxed
            mt-3
            mb-8
            sm:mb-10
            max-w-[540px]
          "
        >
          Create your first assignment
          to start collecting and
          grading student submissions.
          You can define marking
          criteria and let AI assist
          with grading.
        </p>

        {/* CTA */}
        <Link
          href="/assignments/create"
        >
          <button
            onClick={onCreate}
            className="
              bg-[#111111]
              hover:bg-black
              text-white
            
              px-4
sm:px-6
md:px-8

py-2.5
sm:py-3
md:py-3.5
              rounded-full
              flex
              items-center
              gap-2.5
              sm:gap-3
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
            "
          >
            <Plus
              size={16}
              strokeWidth={2.8}
            />

            <span
              className="
                text-[12px]
sm:text-[14px]
md:text-[15px]
                font-medium
                tracking-tight
              "
            >
              Create Your First Assignment
            </span>
          </button>
        </Link>
      </div>
    </main>
  );
};

export default MainContent;