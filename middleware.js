import { NextResponse } from 'next/server';



export async function middleware(request) {
  const { pathname } = request.nextUrl;
  // Redirect '/' to '/dashboard'
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
