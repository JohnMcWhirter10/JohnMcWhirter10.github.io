'use client';

import { useEffect, useState, type RefObject } from 'react';
import { MOBILE_BREAKPOINT, MOBILE_HEADER_PX } from '@/lib/scroll';

const SENTINEL_FRACTION = 0.25;
const BOTTOM_PX = 8;

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

			const root = document.scrollingElement ?? document.documentElement;
			const atBottom = root.scrollTop + window.innerHeight >= root.scrollHeight - BOTTOM_PX;
			if (atBottom) {
				setActiveSection(ids[ids.length - 1]);
				return;
			}

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
