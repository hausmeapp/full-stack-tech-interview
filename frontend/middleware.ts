import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user
  const { pathname } = req.nextUrl

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = ["/dashboard", "/calculator"]
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from auth pages to dashboard
  const authPaths = ["/auth/login", "/auth/register"]
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/calculator/:path*", "/auth/:path*"]
}
