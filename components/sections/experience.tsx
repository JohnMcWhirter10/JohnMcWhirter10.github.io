import { jobs } from '@/lib/jobs';
import type { SectionContentProps } from '@/lib/types';
import { ContentRow } from '@/components/content-row';

const Experience = ({}: SectionContentProps) => {
	return (
		<div className='flex flex-col w-full'>
			{jobs.map((job) => {
				const range = job.endDate ? `${job.startDate} – ${job.endDate}` : job.startDate;
				const meta = job.location ? `${job.location} · ${range}` : range;

				return (
					<ContentRow
						key={`${job.companyTitle}-${job.title}-${job.startDate}`}
						title={job.title}
						subtitle={job.companyTitle}
						meta={meta}
						body={job.bulletPoints[0]}
						tags={job.technologies}
					/>
				);
			})}
		</div>
	);
};

export default Experience;
