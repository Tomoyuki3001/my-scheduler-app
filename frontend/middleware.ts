import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  console.log("token", req);
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/events/create"];

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/events/create"],
};
