import type { ActivityType, SectionContentProps } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import TAMULogo from '@/assets/images/TAMU-LOGO.png';
import { ContentRow } from '@/components/content-row';

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
	return (
		<div className='flex flex-col gap-8 w-full'>
			<div className='theme-tamu rounded-lg p-6 md:p-8 max-w-3xl mx-auto w-full'>
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
			</div>

			<div className='text-center mb-4'>
				<h3 className='text-2xl font-bold'>Campus Involvement</h3>
			</div>

			<div className='w-full'>
				{activities.map((activity) => (
					<ContentRow
						key={activity.title}
						title={activity.title}
						body={activity.description}
						href={activity.link}
					/>
				))}
			</div>
		</div>
	);
};

export default Education;
