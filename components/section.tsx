'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import About from './sections/about';
import Experience from './sections/experience';
import ProjectsSection from './sections/projects';
import Education from './sections/education';
import Connect from './sections/connect';

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
};

export const Section = forwardRef<HTMLElement, SectionProps>(({ id, title, content }, ref) => {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const [inViewRef, inView] = useInView({
		threshold: 0.15,
		rootMargin: '0px 0px -10% 0px',
		triggerOnce: false,
	});

	const setRefs = (element: HTMLElement | null) => {
		if (typeof ref === 'function') ref(element);
		else if (ref) ref.current = element;
		inViewRef(element);
	};

	useEffect(() => {
		setIsIntersecting(inView);
	}, [inView]);

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
			className='w-full flex flex-col md:flex-row items-center justify-center relative bg-background text-foreground'
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
