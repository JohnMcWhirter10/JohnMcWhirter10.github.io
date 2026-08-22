'use client';

import { useRef } from 'react';
import { MainSidebar } from '@/components/main-sidebar';
import { Section } from '@/components/section';
import { sections } from '@/lib/data';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useActiveSection } from '@/hooks/use-active-section';
import { isMobileViewport, scrollToSection } from '@/lib/scroll';

const sectionIds = sections.map((section) => section.id);

export default function Home() {
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const activeSection = useActiveSection(sectionRefs, sectionIds);
	const activeTitle = sections.find((section) => section.id === activeSection)?.title ?? 'About';

	const navigateToSection = (index: number) => {
		const sectionRef = sectionRefs.current[index];
		if (sectionRef) {
			scrollToSection(sectionRef, { isMobile: isMobileViewport() });
		}
	};

	return (
		<SidebarProvider>
			<MainSidebar sections={sections} sectionRefs={sectionRefs} activeSection={activeSection} />

			<div className='md:hidden w-full h-fit z-30 p-4 fixed top-0 bg-background/80 backdrop-blur-md shadow-xs flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>{activeTitle}</h1>
				<SidebarTrigger>
					<Menu className='h-6 w-6' />
				</SidebarTrigger>
			</div>

			<div className='fixed right-4 top-1/2 transform -translate-y-1/2 z-20 md:hidden'>
				<div className='flex flex-col items-center gap-3'>
					{sections.map((section, index) => (
						<button
							key={section.id}
							onClick={() => navigateToSection(index)}
							className='relative p-1 focus:outline-hidden'
							aria-label={`Jump to ${section.title} section`}
						>
							<div
								className={`h-2 w-2 rounded-full transition-colors ${
									activeSection === section.id
										? 'bg-primary'
										: 'bg-muted-foreground/30 hover:bg-muted-foreground'
								}`}
							/>
							{activeSection === section.id && (
								<motion.div
									className='absolute inset-0 h-4 w-4 border border-primary rounded-full'
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									layoutId='activeSectionIndicator'
								/>
							)}
						</button>
					))}
				</div>
			</div>

			<main className='flex-1 min-w-0 pt-16 md:pt-0'>
				{sections.map((section, index) => (
					<Section
						key={section.id}
						ref={(el) => {
							sectionRefs.current[index] = el;
						}}
						id={section.id}
						title={section.title}
						content={section.content}
					/>
				))}
			</main>
		</SidebarProvider>
	);
}
