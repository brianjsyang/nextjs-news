// validate, redirect, process incoming data.
import { NextResponse } from "next/server";

// reserved file name AND function name
export function middleware(request) {
  // console.log(request);
  return NextResponse.next(); // simply forwards incoming request to destination
}

export const config = {
  matcher: '/news' // filter for specific
}