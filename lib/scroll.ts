export const MOBILE_HEADER_PX = 64;
export const MOBILE_BREAKPOINT = 768;

export function isMobileViewport() {
	return window.innerWidth < MOBILE_BREAKPOINT;
}

export function scrollToSection(element: HTMLElement, { isMobile }: { isMobile: boolean }) {
	const offset = isMobile ? MOBILE_HEADER_PX : 0;
	const top = window.scrollY + element.getBoundingClientRect().top - offset;
	window.scrollTo({
		top,
		behavior: 'smooth',
	});
}
