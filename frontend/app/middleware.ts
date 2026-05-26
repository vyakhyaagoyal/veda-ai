import { NextResponse }
  from "next/server";

import type {
  NextRequest,
} from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "token"
    );

  const authRoutes = [
    "/login",
    "/signup",
    "/verify-otp",
  ];

  if (
    token &&
    authRoutes.includes(
      request.nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/",
        request.url
      )
    );
  }

  return NextResponse.next();
}