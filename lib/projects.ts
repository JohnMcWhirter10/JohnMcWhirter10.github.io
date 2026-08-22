import type { ProjectType } from './types';

import BPhotography from '@/assets/images/b-photography.png';
import VectorVetted from '@/assets/images/vectorVettedLogo.png';
import ULSWAPDAQ from '@/assets/images/ULSWAPDAQ.png';
import TexasInstruments from '@/assets/images/TexasInstruments.png';
import MondrianUI from '@/assets/images/mondrian-ui.png';
import Avalon from '@/assets/images/Avalon.png';
import DCCapture from '@/assets/images/DC_Capture.png';

export const projects: ProjectType[] = [
	{
		title: 'Aggies Invent: Sandia',
		description:
			'Developed and pitched a Python Flask AI document declassification system for Sandia National Laboratories, automating secure content flagging for enhanced workplace security.',
		link: 'https://github.com/JohnMcWhirter10/aggies-invent-team-5',
		image: DCCapture,
		categories: ['Python', 'AI', 'Flask', 'Security'],
	},
	{
		title: 'Vector Vetted',
		description:
			'A web application that semantically analyzes and verifies the relevance of a resume against a specific job description. Uses vector embeddings and cosine similarity to determine resume-job compatibility with complete client-side operation for enhanced privacy.',
		link: 'https://github.com/JohnMcWhirter10/vector-vetted',
		image: VectorVetted,
		categories: ['Web Development', 'AI', 'NextJS', 'ReactJS'],
	},
	{
		title: 'B Photography',
		description:
			'Professional photo gallery website created for a photographer with responsive design and optimized image loading. Built with NextJS and deployed on Vercel.',
		link: 'https://b-photography.vercel.app/',
		image: BPhotography,
		categories: ['Web Development', 'NextJS', 'Vercel'],
	},
	{
		title: 'Avalon Game',
		image: Avalon,
		description:
			'Mobile implementation of the popular social deduction board game Avalon with a pass-and-play format. Features complex navigation handling multiple game phases and secure information hiding between player turns.',
		categories: ['Mobile Development', 'Flutter', 'Dart', 'Game Development'],
	},
	{
		title: 'UL-SWAP DAQ',
		link: 'https://github.com/jmcwhirter1608/ULSWAPDAQ',
		image: ULSWAPDAQ,
		description:
			'The Ultra Low Size Weight and Power Data Acquisition Unit (UL-SWaP DaQ) was a collaborative project undertaken at Texas A&M University, sponsored by Sandia National Laboratories. Led a 3-person team in designing a Data Acquisition Unit for rocket environment applications.',
		categories: ['Hardware', 'Engineering', 'Python'],
	},
	{
		title: 'ADC Configuration GUI',
		description:
			'Developed a Python-based graphical user interface for configuring High Speed Analog-to-Digital Converters (ADCs) at Texas Instruments. Simplified the testing and validation process for high-speed converters and integrated with hardware testing equipment.',
		image: TexasInstruments,
		categories: ['Python', 'GUI', 'Hardware'],
	},
	{
		title: 'Mondrian UI',
		description:
			'MondrianUI is a modern and minimalist UI library designed with simplicity and elegance in mind. It offers a set of flexible components that allow developers to create intuitive and aesthetically pleasing user interfaces with ease.',
		link: 'https://github.com/JohnMcWhirter10/mondrian-ui',
		image: MondrianUI,
		categories: ['UI/UX', 'Component Library', 'ReactJS'],
	},
];
