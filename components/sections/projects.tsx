import Image from 'next/image';
import type { SectionContentProps } from '@/lib/types';
import { projects } from '@/lib/projects';
import { ContentRow } from '@/components/content-row';

const ProjectsSection = ({}: SectionContentProps) => {
	return (
		<div className='w-full'>
			{projects.map((project) => (
				<ContentRow
					key={project.title}
					title={project.title}
					body={project.description}
					tags={project.categories}
					href={project.link}
					leading={
						<div className='relative w-40 sm:w-48 md:w-56 lg:w-72 aspect-[16/10] rounded-md bg-muted/40'>
							<Image
								src={project.image}
								alt={project.title}
								fill
								className='object-contain'
								sizes='(max-width: 768px) 160px, (max-width: 1024px) 224px, 288px'
							/>
						</div>
					}
				/>
			))}
		</div>
	);
};

export default ProjectsSection;
