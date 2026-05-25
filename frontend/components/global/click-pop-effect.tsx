"use client";

import { useEffect, useRef } from "react";

interface LineConfig {
  key: string;
  offsetX: number;
  offsetY: number;
  rotate: number;
  height: number;
  delay: number;
}

const LINES: LineConfig[] = [
  {
    key: "ll",
    offsetX: -11.5,
    offsetY: 7,
    rotate: -36,
    height: 5,
    delay: 0,
  },

  {
    key: "lc",
    offsetX: -4,
    offsetY: 2,
    rotate: -14,
    height: 7,
    delay: 0.015,
  },

  {
    key: "rc",
    offsetX: 4,
    offsetY: 2,
    rotate: 14,
    height: 7,
    delay: 0.015,
  },

  {
    key: "rr",
    offsetX: 11.5,
    offsetY: 7,
    rotate: 36,
    height: 5,
    delay: 0,
  },
];

export default function CursorPop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent): void => {
      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        position: absolute;
        left: ${e.clientX - 4}px;
        top: ${e.clientY - 22}px;
        transform: rotate(-12deg);
        pointer-events: none;
      `;

      LINES.forEach((line) => {
        const el = document.createElement("div");
        el.style.cssText = `
          position: absolute;
          width: 2px;
          height: ${line.height}px;
          background-color: black;
          border-radius: 99px;
          left: ${line.offsetX}px;
          top: ${line.offsetY}px;
          transform-origin: bottom center;
          rotate: ${line.rotate}deg;
        `;
        wrapper.appendChild(el);

        el.animate(
  [
    {
      transform:
        "translateY(0px) scaleY(1)",
      opacity: "1",
    },

    {
      transform:
        "translateY(-14px) scaleY(1)",
      opacity: "1",
      offset: 0.6,
    },

    {
      transform:
        "translateY(-17px) scaleY(0.18)",
      opacity: "0.9",
      offset: 0.82,
    },

    {
      transform:
        "translateY(-19px) scaleY(0)",
      opacity: "0",
    },
  ],
  {
    duration: 720,

    delay: line.delay * 1000,

    easing:
      "cubic-bezier(0.22, 1, 0.36, 1)",

    fill: "forwards",
  }
);
      });

      container.appendChild(wrapper);
      setTimeout(() => wrapper.remove(), 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[999999]"
    />
  );
}