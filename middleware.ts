import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
    const nome = request.cookies.get("nome")?.value;
    const telefone = request.cookies.get("telefone")?.value;
    const { pathname } = request.nextUrl;

    if (pathname === "/" || pathname === "/form") {
        return NextResponse.next();
    }

    if (!nome || !telefone) {
        Cookies.set("callback", pathname);
        console.log(pathname);
        return NextResponse.redirect(
            new URL("/form", request.url)
        );
    }

    const slugMatch = pathname.match(/^\/sites\/([^/]+)/);
    const slug = slugMatch ? slugMatch[1] : null;

    if (slug) {
        const isAdminPath =
            pathname === `/sites/${slug}/admin`;
        const isAdmin = nome === slug && telefone === "000";

        if (isAdmin) {
            if (pathname === `/sites/${slug}`) {
                return NextResponse.redirect(
                    new URL(
                        `/sites/${slug}/admin`,
                        request.url
                    )
                );
            }

            return NextResponse.next();
        }

        if (isAdminPath) {
            return NextResponse.redirect(
                new URL(`/sites/${slug}`, request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/form",
        "/sites/:slug",
        "/sites/:slug/admin",
    ],
};
