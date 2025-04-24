import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {auth} from "@/context/auth";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

export async function middleware (request) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Protected routes
    const protectedRoutes = ['/user', '/admin']

    // Public routes
    const authRoutes = ['/login', '/register']

    // if user is connected and try to access to an authentication route
    if (session && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/user', request.url))
    }

    // if user is not connected and try to access to a protected route
    if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // check role for admin
    if (pathname.startsWith('/admin') && session?.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return NextResponse.next()
}


