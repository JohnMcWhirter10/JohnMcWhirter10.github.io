import type { SectionContentProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Headshot from '@/assets/images/AMCHeadshot.jpg';

const About = ({ content }: SectionContentProps) => {
	return (
		<motion.div
			className='w-full max-w-5xl mx-auto flex flex-col items-center md:grid md:grid-cols-[auto_1fr] md:items-center gap-8 px-4'
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<div className='relative w-48 sm:w-56 md:w-64 aspect-[3/4] shrink-0 rounded-lg overflow-hidden'>
				<Image
					src={Headshot}
					alt='John McWhirter'
					fill
					className='object-cover object-top'
					priority
					sizes='(max-width: 640px) 192px, (max-width: 768px) 224px, 256px'
				/>
			</div>

			<div className='text-center md:text-left'>
				<h1 className='text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-2'>John McWhirter</h1>
				<p className='text-primary font-heading text-lg md:text-xl mb-4'>Solutions Architect</p>
				<p className='text-muted-foreground text-base md:text-lg leading-relaxed'>{content}</p>
			</div>
		</motion.div>
	);
};

export default About;
