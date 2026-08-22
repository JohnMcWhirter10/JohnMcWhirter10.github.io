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
						<Image
							src={project.image}
							alt={project.title}
							className='h-14 w-20 md:h-16 md:w-24 object-cover rounded-md'
						/>
					}
				/>
			))}
		</div>
	);
};

export default ProjectsSection;
