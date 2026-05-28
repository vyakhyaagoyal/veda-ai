"use client";

import { useState } from "react";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import AuthInput from "@/components/auth/auth-input";

import { authService } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  try {
    setLoading(true);

    const response =
      await authService.login({
        email,
        password,
      });

    console.log(response);

    localStorage.setItem(
      "token",
      response.token
    );

    setUser(response.user);

    toast.success("Welcome back!");

    router.push("/");
  } catch (error) {
    toast.error("Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <form
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin();
  }}
>
      {/* Mobile Logo */}
      <div className="lg:hidden mb-10">
        <div className="flex items-center gap-3">
          <Image
            src="/veda-ai-logo-cropped.svg"
            alt="VedaAI Logo"
            width={40}
            height={40}
            className="w-auto h-auto"
          />

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
            "
          >
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
        Welcome back
      </h1>

      <p
        className="
          text-zinc-500
          mb-8
        "
      >
        Sign in to continue
      </p>

      <AuthInput
        label="Email"
        type="email"
        placeholder="you@school.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div
        className="
    mb-6

    rounded-3xl

    border
    border-orange-200

    bg-orange-50

    p-5
  "
      >
        <p
          className="
      text-sm
      font-semibold
      text-orange-950
      mb-3
    "
        >
          Demo Credentials
        </p>

        <div className="space-y-2">
          <button
            onClick={() => {
              setEmail("vyakhyagoyal22@gmail.com");
              setPassword("Vyakhya12.");
            }}
            className="
        w-full

        text-left

        rounded-2xl

        bg-white

        px-4
        py-3

        border
        border-orange-100

        hover:border-orange-300
        hover:bg-orange-100/40

        transition-all
      "
          >
            <p className="font-semibold text-sm">Teacher Demo</p>

            <p className="text-xs text-zinc-500 mt-1">
              vyakhyagoyal22@gmail.com
            </p>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleLogin}
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
      active:scale-[0.99]
      shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      disabled:opacity-50
    "
        >
          {loading ? (
            <div
              className="
      flex
      items-center
      justify-center
      gap-3
    "
            >
              <div
                className="
        w-5
        h-5

        rounded-full

        border-2
        border-white/30
        border-t-white

        animate-spin
      "
              />
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* <button
    onClick={async () => {
      setEmail("vyakhyagoyal22@gmail.com");
      setPassword("Vyakhya12.");

      await authService.login({
        email: "vyakhyagoyal22@gmail.com",
        password: "Vyakhya12.",
      });

      router.push("/");
    }}
    className="
      w-full
      h-12
      rounded-full
      bg-orange-100
      hover:bg-orange-200
      text-orange-950
      font-semibold
      transition-all
    "
  >
    Explore Demo
  </button> */}
      </div>

      <p
        className="
          text-center
          mt-8
          text-zinc-500
        "
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="
            text-black
            font-semibold
          "
        >
          Sign Up
        </Link>
      </p>
      </form>
    </div>
  );
}
