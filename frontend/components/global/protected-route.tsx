"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuthStore,
} from "@/store/auth.store";
import AuthLoading from "./auth-loading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const {
    isAuthenticated,
    loading,
  } = useAuthStore();

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated
    ) {
      router.push("/login");
    }
  }, [
    loading,
    isAuthenticated,
  ]);

  if (loading) {
  return <AuthLoading />;
}

  return <>{children}</>;
}