'use client';

import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import About from './sections/about';
import Experience from './sections/experience';
import ProjectsSection from './sections/projects';
import Education from './sections/education';
import Connect from './sections/connect';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: 'easeOut',
			staggerChildren: 0.15,
		},
	},
};

const childVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

type SectionProps = {
	id: string;
	title: string;
	content: string;
	theme?: string;
};

// Global registry of sections for scroll-based theme management
type SectionRegistry = {
	id: string;
	element: HTMLElement;
	theme?: string;
}[];
const sectionRegistry: SectionRegistry = [];

export const Section = forwardRef<HTMLElement, SectionProps>(({ id, title, content, theme }, ref) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const { setTheme } = useTheme();
	const sectionRef = useRef<HTMLElement | null>(null);

	// Only use IntersectionObserver for animation visibility, not theme changes
	const [inViewRef, inView] = useInView({
		threshold: 0.15,
		rootMargin: '0px 0px -10% 0px',
		triggerOnce: false,
	});

	// Register section with global registry for scroll-based theme management
	useEffect(() => {
		const handleScroll = () => {
			requestAnimationFrame(() => {
				if (sectionRegistry.length === 0) return;

				// Find section with largest visible area
				const viewportHeight = window.innerHeight;
				const scrollTop = window.scrollY;
				const scrollBottom = scrollTop + viewportHeight;

				let maxVisibleSection = null;
				let maxVisibleArea = 0;

				for (const section of sectionRegistry) {
					const rect = section.element.getBoundingClientRect();
					const sectionTop = rect.top + scrollTop;
					const sectionBottom = rect.bottom + scrollTop;

					// Calculate visible area
					const visibleTop = Math.max(scrollTop, sectionTop);
					const visibleBottom = Math.min(scrollBottom, sectionBottom);
					const visibleArea = Math.max(0, visibleBottom - visibleTop);

					if (visibleArea > maxVisibleArea) {
						maxVisibleArea = visibleArea;
						maxVisibleSection = section;
					}
				}

				// Set theme based on most visible section
				if (maxVisibleSection && maxVisibleSection.theme) {
					setTheme(maxVisibleSection.theme);
				}
			});
		};

		// Add scroll listener
		window.addEventListener('scroll', handleScroll, { passive: true });
		// Initial check
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [setTheme]);

	const setRefs = (element: HTMLElement | null) => {
		// Set ref for forwardRef
		if (typeof ref === 'function') ref(element);
		else if (ref) ref.current = element;

		// Set local ref
		sectionRef.current = element;

		// Set ref for InView animation
		inViewRef(element);

		// Register for scroll-based theme management
		if (element) {
			// Remove any existing registration for this id
			const existingIndex = sectionRegistry.findIndex((s) => s.id === id);
			if (existingIndex >= 0) {
				sectionRegistry.splice(existingIndex, 1);
			}

			// Add to registry
			sectionRegistry.push({
				id,
				element,
				theme,
			});
		}
	};

	useEffect(() => {
		if (inView) {
			setIsIntersecting(true);
		} else {
			setIsIntersecting(false);
		}
	}, [inView]);

	// Clean up registry when component unmounts
	useEffect(() => {
		return () => {
			const index = sectionRegistry.findIndex((s) => s.id === id);
			if (index >= 0) {
				sectionRegistry.splice(index, 1);
			}
		};
	}, [id]);

	const renderSectionContent = () => {
		switch (id) {
			case 'about':
				return <About content={content} />;
			case 'experience':
				return <Experience content={content} />;
			case 'projects':
				return <ProjectsSection content={content} />;
			case 'education':
				return <Education content={content} />;
			case 'connect':
				return <Connect content={content} />;
			default:
				return <p>{content}</p>;
		}
	};

	return (
		<section
			ref={setRefs}
			id={id}
			className={cn(
				'w-full flex flex-col md:flex-row items-center justify-center relative bg-background text-foreground',
				theme && `theme-${theme}`
			)}
		>
			<motion.div
				className='w-full h-full max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center relative z-10'
				initial='hidden'
				animate={isIntersecting ? 'visible' : 'hidden'}
				variants={sectionVariants}
			>
				<motion.h2
					variants={childVariants}
					className='text-4xl md:text-5xl font-bold text-left w-full mb-6 md:mb-8'
				>
					{title}
				</motion.h2>

				<motion.div variants={childVariants} className='w-full'>
					{renderSectionContent()}
				</motion.div>
			</motion.div>
		</section>
	);
});

Section.displayName = 'Section';
