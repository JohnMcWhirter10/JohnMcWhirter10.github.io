import type { ActivityType, SectionContentProps } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';
import TAMULogo from '@/assets/images/TAMU-LOGO.png';

const activities: ActivityType[] = [
	{
		title: "Aggie Men's Club",
		description:
			'Active member of this Christian-based social organization, led morning bible study group, and participated in SongFest which raised $50,000 for Kairos Christian School in Guatemala.',
		link: 'https://www.aggiemensclub.com/',
	},
	{
		title: 'Songfest',
		description:
			'Participated in this largest philanthropic event at Texas A&M, raising funds for Kairos Christian School in Guatemala through a spirited dancing competition.',
		link: 'https://www.chiomegasongfest.com/',
	},
	{
		title: 'Big Event',
		description:
			'Volunteered in the largest one-day, student-run service project in the nation, contributing to community improvement projects in Bryan/College Station.',
		link: 'https://bigevent.tamu.edu/',
	},
	{
		title: 'Sandia National Labs Senior Project',
		description:
			'Led a 3-person team in designing a Data Acquisition Unit for rocket environment applications, focusing on signal acquisition capabilities and environmental durability.',
		link: 'https://www.sandia.gov/',
	},
	{
		title: 'TAMU Robomasters',
		description:
			'Participated in this competitive robotics team for one semester, though participation was limited due to the COVID-19 pandemic.',
		link: 'https://tamurobomaster.com/',
	},
	{
		title: 'Breakaway Ministries Volunteer',
		description:
			'Served as a Greeter for one semester, welcoming newcomers to stadium events, providing door assistance, and helping guests find available seating.',
		link: 'https://www.breakawayministries.org/',
	},
];

const Education = ({ content }: SectionContentProps) => {
	const activityItems = activities.map((activity, index) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			key={index}
			className='h-full'
			whileHover={{ y: -5, transition: { duration: 0.2 } }}
		>
			<Card className='h-full border-2 border-primary shadow-xs hover:shadow-md transition-all duration-200'>
				<CardContent className='p-6 flex flex-col h-full'>
					<h3 className='text-xl font-bold mb-3 text-primary'>
						<Link
							href={activity.link}
							className='hover:underline hover:text-primary/80 transition-colors flex items-center gap-1'
							target='_blank'
							rel='noopener noreferrer'
						>
							{activity.title}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='ml-1'
							>
								<path d='M7 7h10v10' />
								<path d='M7 17 17 7' />
							</svg>
						</Link>
					</h3>
					<p className='text-sm leading-relaxed text-muted-foreground'>{activity.description}</p>
				</CardContent>
			</Card>
		</motion.div>
	));

	return (
		<div className='flex flex-col gap-8 w-full'>
			<Card className='shadow-xs border-2 border-primary'>
				<CardContent className='p-6 md:p-8'>
					<div className='flex flex-col sm:flex-row items-center gap-6'>
						<div className='w-full sm:w-auto flex justify-center'>
							<div className='w-[120px] h-[120px] relative flex items-center justify-center rounded-lg p-2 border-2 border-primary'>
								<Image
									src={TAMULogo}
									alt='Texas A&M University Logo'
									className='object-contain'
									priority
								/>
							</div>
						</div>
						<div className='w-full'>
							<p className='text-lg text-center sm:text-left'>{content}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='text-center mb-4'>
				<h3 className='text-2xl font-bold'>Campus Involvement</h3>
			</div>

			<motion.div layout className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{activityItems}
			</motion.div>
		</div>
	);
};

export default Education;
