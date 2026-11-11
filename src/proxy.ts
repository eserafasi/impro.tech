import { NextResponse, type NextRequest } from "next/server";

/**
 * URL scheme: English lives at "/" (no prefix), Spanish at "/es".
 * Internally every page sits under app/[lang], so:
 *   /cv        -> rewrite  -> /en/cv
 *   /es/cv     -> as is
 *   /en/cv     -> redirect -> /cv   (one canonical URL per page)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|opengraph-image|icon|.*\\..*).*)"],
};
