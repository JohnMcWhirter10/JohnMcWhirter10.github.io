'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SectionType } from '@/lib/types';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { isMobileViewport, scrollToSection } from '@/lib/scroll';

type MainSidebarProps = {
	sections: SectionType[];
	sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
	activeSection: string;
};

export const MainSidebar = ({ sections, sectionRefs, activeSection }: MainSidebarProps) => {
	const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string, index: number) => {
		e.preventDefault();
		const sectionRef = sectionRefs.current[index];
		if (sectionRef) {
			scrollToSection(sectionRef, { isMobile: isMobileViewport() });
		}
	};

	return (
		<Sidebar className='border-r-2 border-primary backdrop-blur-xs'>
			<SidebarHeader className='hidden max-md:flex min-[992px]:flex py-8 flex-col items-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className='text-2xl font-bold tracking-tight'>
						John McWhirter
					</h1>
					<p className='text-sm text-muted-foreground text-center mt-1'>
						Solutions Architect
					</p>
				</motion.div>
			</SidebarHeader>

			<SidebarContent className='h-full flex flex-col justify-between overflow-hidden'>
				<nav className='flex flex-col gap-2 px-2'>
					{sections.map((section, i) => {
						const isActive = activeSection === section.id;

						return (
							<motion.div
								key={section.id}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: i * 0.1, duration: 0.3 }}
							>
								<button
									key={section.id}
									onClick={(e) => handleNavClick(e, section.id, i)}
									className={cn(
										'w-full flex items-center gap-2 py-3 px-4 rounded-lg text-left transition-all duration-200',
										isActive
											? 'bg-primary/10 text-primary font-medium'
											: 'hover:bg-accent/50 text-muted-foreground'
									)}
								>
									{isActive && (
										<motion.div
											layoutId='sidebar-active-indicator'
											className='w-1 h-5 bg-primary rounded-full'
											transition={{ duration: 0.3 }}
										/>
									)}
									<span className={cn(isActive && 'ml-2')}>{section.title}</span>
								</button>
							</motion.div>
						);
					})}
				</nav>
			</SidebarContent>

			<SidebarFooter className='py-4 text-center text-sm text-muted-foreground border-t-2 border-primary'>
				<Link
					href='/assets/files/resume.pdf'
					download
					className='flex items-center justify-center gap-2 px-4 py-2 mb-2 rounded-lg transition-all duration-200 hover:bg-primary/10 text-primary font-medium'
				>
					<Download size={16} />
					<span>Resume</span>
				</Link>
				<p>© {new Date().getFullYear()} John McWhirter</p>
			</SidebarFooter>
		</Sidebar>
	);
};
