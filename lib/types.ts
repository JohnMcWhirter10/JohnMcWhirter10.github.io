import { StaticImageData } from 'next/image';

export interface SectionContentProps {
	content: string;
}

export type SectionId = 'about' | 'experience' | 'projects' | 'education' | 'connect';

export interface SectionType {
	id: SectionId;
	title: string;
	content: string;
}

export interface JobType {
	title: string;
	companyTitle: string;
	location: string;
	startDate: string;
	endDate?: string;
	bulletPoints: string[];
	technologies: string[];
}

export interface ProjectType {
	title: string;
	description: string;
	link?: string;
	image: StaticImageData;
	categories: string[];
}

export interface ActivityType {
	title: string;
	description: string;
	link: string;
}
