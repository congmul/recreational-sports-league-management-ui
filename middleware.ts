import { NextResponse } from "next/server";

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|.test|.swa|favicon.ico|sw.js|health.html|manifest).*)']
}

export async function middleware(req: any) {
  // Protect routes from general users.
  if(req.url.includes('create') || req.url.includes('edit')){    
    const userInfo = req.cookies.get('userInfo'); // Get the token from cookies
    const userInfoParsed = userInfo && JSON.parse(userInfo.value);
    if(userInfoParsed == null || userInfoParsed.role !== "admin"){
      const response = NextResponse.redirect(new URL(`${'/'}`, req.url));
      return response;
    }else{
      return NextResponse.next()
    }
  }
}