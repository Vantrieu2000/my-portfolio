import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers);
    let url = new URL(request.url);

    requestHeaders.set('x-tr-pathname', url.pathname);

    return NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        },
    });
}
