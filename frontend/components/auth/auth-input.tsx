"use client";

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({
  label,
  ...props
}: Props) {
  return (
    <div className="mb-5">
      <label
        className="
          text-sm
          font-semibold
          text-[#2D2D2D]
          mb-2
          block
        "
      >
        {label}
      </label>

      <input
        {...props}
        className="
          w-full

          h-14

          rounded-full

          px-6

          bg-[#F1F1F1]

          border
          border-transparent

          outline-none

          transition-all
          duration-300

          focus:border-orange-300
          focus:bg-white
          focus:shadow-[0_0_0_4px_rgba(255,115,0,0.08)]

          placeholder:text-zinc-400
        "
      />
    </div>
  );
}