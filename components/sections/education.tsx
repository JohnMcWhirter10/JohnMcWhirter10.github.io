import type { SectionContentProps } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import TAMULogo from '@/assets/images/TAMU-LOGO.png';
import { ContentRow } from '@/components/content-row';
import { activities } from '@/lib/activities';

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
