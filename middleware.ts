import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const nome = request.cookies.get("nome")?.value;
    const telefone = request.cookies.get("telefone")?.value;

    if (request.nextUrl.pathname === "/form") {
        return NextResponse.next();
    }

    if (!nome || !telefone) {
        return NextResponse.redirect(
            new URL("/form", request.url)
        );
    }

    if (
        nome === "Thdeu" &&
        request.nextUrl.pathname !== "/admin"
    ) {
        return NextResponse.redirect(
            new URL("/admin", request.url)
        );
    }

    if (
        nome !== "Thdeu" &&
        request.nextUrl.pathname === "/admin"
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/admin"],
};
