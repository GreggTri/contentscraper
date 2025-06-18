import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  console.log("🔒 middleware running for:", req.nextUrl.pathname);
  
  const session = req.cookies.get("session")?.value
  const path = req.nextUrl.pathname

  const isLoggedIn = !!session
  const isDashboard = path.startsWith("/dashboard")
  const isRoot = path === "/"

  if (!isLoggedIn && isDashboard) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (isLoggedIn && isRoot) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
}