import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("session")?.value

    const publicRoutes = ['/screens/login', '/screens/register', '/']

    const isPublic = publicRoutes.includes(pathname)

    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/screens/login", request.url))
    }

    if (token && isPublic && pathname !== "/") {
        return NextResponse.redirect(new URL("/screens/home", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};