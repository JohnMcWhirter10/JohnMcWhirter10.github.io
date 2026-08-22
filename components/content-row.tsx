'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type ContentRowProps = {
	title: string;
	subtitle?: string;
	meta?: string;
	body?: string;
	tags?: string[];
	href?: string;
	leading?: ReactNode;
	defaultOpen?: boolean;
};

const TagList = ({ tags }: { tags: string[] }) => (
	<div className='flex flex-wrap gap-1.5 mt-2'>
		{tags.map((tag) => (
			<span key={tag} className='text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary'>
				{tag}
			</span>
		))}
	</div>
);

const Title = ({ title, href }: { title: string; href?: string }) => {
	const className = 'font-heading font-bold text-lg md:text-xl text-foreground';

	if (href) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className={cn(className, 'hover:text-primary transition-colors')}
			>
				{title}
			</a>
		);
	}

	return <h3 className={className}>{title}</h3>;
};

const RowDetails = ({
	meta,
	body,
	tags,
	leading,
	showLeading,
}: {
	meta?: string;
	body?: string;
	tags?: string[];
	leading?: ReactNode;
	showLeading?: boolean;
}) => (
	<div className='mt-2'>
		{showLeading && leading ? <div className='mb-3'>{leading}</div> : null}
		{meta ? <p className='text-sm text-muted-foreground'>{meta}</p> : null}
		{body ? <p className='text-sm md:text-base text-muted-foreground mt-1 leading-relaxed'>{body}</p> : null}
		{tags && tags.length > 0 ? <TagList tags={tags} /> : null}
	</div>
);

export function ContentRow({
	title,
	subtitle,
	meta,
	body,
	tags,
	href,
	leading,
	defaultOpen = false,
}: ContentRowProps) {
	const [open, setOpen] = useState(defaultOpen);

	const headingBlock = (
		<div className='min-w-0'>
			<Title title={title} href={href} />
			{subtitle ? <p className='text-base text-foreground/80 mt-0.5'>{subtitle}</p> : null}
		</div>
	);

	return (
		<div className='w-full max-w-3xl mx-auto py-4 md:py-5 border-b border-border last:border-b-0'>
			<div className='hidden md:flex md:items-start md:gap-4'>
				{leading ? <div className='shrink-0'>{leading}</div> : null}
				<div className='min-w-0 flex-1'>
					{headingBlock}
					<RowDetails meta={meta} body={body} tags={tags} />
				</div>
			</div>

			<Collapsible open={open} onOpenChange={setOpen} className='md:hidden'>
				<div className='flex w-full items-start justify-between gap-3'>
					{headingBlock}
					<CollapsibleTrigger
						className='shrink-0 rounded-md p-1 text-muted-foreground'
						aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
					>
						<ChevronDown className={cn('size-5 transition-transform', open && 'rotate-180')} />
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent>
					<RowDetails meta={meta} body={body} tags={tags} leading={leading} showLeading />
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
