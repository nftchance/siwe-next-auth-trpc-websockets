import { NextRequest } from "next/server"

import { default as auth, withAuth } from "next-auth/middleware"

export function middleware(request: NextRequest) { 
    if (request.nextUrl.pathname.startsWith("/admin")) {
        return withAuth({
            callbacks: {
              authorized: ({ token }) => { 
                console.log('token in _middleware', token)
                return token?.userRole === "admin"
              }
            },
          }) 
    }

    return auth
}
