import { StaticImageData } from 'next/image';
import type React from 'react';

export interface SectionContentProps {
	content: string;
}

export interface SectionType {
	id: string;
	title: string;
	content: string;
	theme: string;
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

export interface TechnologyType {
	label: string;
	icon: React.ReactNode;
}

export interface ActivityType {
	title: string;
	description: string;
	link: string;
}
