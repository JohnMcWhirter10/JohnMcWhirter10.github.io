import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedExact = new Set([
	'/',
	'/favicon.ico',
	'/sitemap.xml',
	'/robots.txt',
	'/manifest.webmanifest',
	'/manifest.json',
]);

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (
		allowedExact.has(pathname) ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/aetheron') ||
		pathname.startsWith('/ecen-758-dbpedia')
	) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL('/', request.url));
}
