"use client";

import { useState } from "react";

import { useRouter }
  from "next/navigation";

import { authService }
  from "@/services/auth.service";

import { useAuthStore }
  from "@/store/auth.store";

export default function VerifyOTPPage() {
  const router =
    useRouter();

  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "verifyEmail"
        )
      : "";

  const handleVerify =
    async () => {
      try {
        setLoading(true);

        const response =
          await authService.verifyOTP(
            {
              email,
              otp,
            }
          );

        localStorage.setItem(
          "token",
          response.token
        );

        setUser(response.user);

        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h1
        className="
          text-4xl
          font-bold
          tracking-tight
          mb-2
        "
      >
        Verify OTP
      </h1>

      <p
        className="
          text-zinc-500
          mb-8
        "
      >
        Enter the verification
        code sent to your email.
      </p>

      <input
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
        placeholder="Enter OTP"
        autoComplete="one-time-code"
        className="
          w-full
          h-16

          rounded-full

          bg-[#F1F1F1]

          text-center
          text-2xl
          tracking-[10px]

          outline-none

          mb-6
        "
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="
          w-full
          h-14

          rounded-full

          bg-black
          text-white

          font-semibold
        "
      >
        {loading
          ? "Verifying..."
          : "Verify Account"}
      </button>
      
    </div>
  );
}