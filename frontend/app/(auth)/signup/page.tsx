"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter }
  from "next/navigation";

import AuthInput
  from "@/components/auth/auth-input";

import { authService }
  from "@/services/auth.service";
import { toast } from "sonner";

export default function SignupPage() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

  const handleSignup =
    async () => {
      try {
        setLoading(true);

        await authService.signup(
          form
        );

        
        localStorage.setItem(
          "verifyEmail",
          form.email
        );


        router.push(
          "/verify-otp"
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      {/* Mobile Logo */}
      <div className="lg:hidden mb-10">
        <div className="flex items-center gap-3">
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-gradient-to-br
              from-orange-400
              to-orange-600

              flex
              items-center
              justify-center

              text-white
              text-xl
              font-bold
            "
          >
            V
          </div>

          <h1 className="text-3xl font-bold">
            VedaAI
          </h1>
        </div>
      </div>

      <h1
        className="
          text-4xl
          font-bold
          tracking-tight
          mb-2
        "
      >
        Create account
      </h1>

      <p
        className="
          text-zinc-500
          mb-8
        "
      >
        Join VedaAI today
      </p>

      <div className="grid grid-cols-2 gap-4">
        <AuthInput
          label="First Name"
          placeholder="John"
          value={form.firstName}
          onChange={(e) =>
            setForm({
              ...form,
              firstName:
                e.target.value,
            })
          }
        />

        <AuthInput
          label="Last Name"
          placeholder="Doe"
          value={form.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              lastName:
                e.target.value,
            })
          }
        />
      </div>

      <AuthInput
        label="Email"
        type="email"
        placeholder="you@school.com"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email:
              e.target.value,
          })
        }
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="Create password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password:
              e.target.value,
          })
        }
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        className="
          w-full
          h-14

          rounded-full

          bg-[#111111]
          hover:bg-black

          text-white
          font-semibold

          transition-all
          duration-300

          hover:scale-[1.01]

          shadow-[0_10px_30px_rgba(0,0,0,0.15)]
        "
      >
        {loading
          ? "Sending OTP..."
          : "Send Verification Code"}
      </button>

      <p
        className="
          text-center
          mt-8
          text-zinc-500
        "
      >
        Already have an account?{" "}

        <Link
          href="/login"
          className="
            text-black
            font-semibold
          "
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}