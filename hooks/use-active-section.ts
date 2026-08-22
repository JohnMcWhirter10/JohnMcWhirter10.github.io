'use client';

import { useEffect, useState, type RefObject } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_HEADER_PX = 64;
const SENTINEL_FRACTION = 0.25;

export function useActiveSection(
	sectionRefs: RefObject<(HTMLElement | null)[]>,
	sectionIds: readonly string[]
) {
	const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

	useEffect(() => {
		let ticking = false;

		const update = () => {
			ticking = false;
			const ids = sectionIds;
			if (ids.length === 0) return;

			const sentinel =
				(window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_HEADER_PX : 0) +
				window.innerHeight * SENTINEL_FRACTION;

			let current = ids[0];
			for (let i = 0; i < ids.length; i++) {
				const el = sectionRefs.current?.[i];
				if (!el) continue;
				if (el.getBoundingClientRect().top <= sentinel) {
					current = ids[i];
				}
			}

			setActiveSection(current);
		};

		const onScrollOrResize = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};

		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize);
		update();

		return () => {
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
		};
	}, [sectionRefs, sectionIds]);

	return activeSection;
}
