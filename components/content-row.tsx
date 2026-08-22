'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type ContentRowProps = {
	title: string;
	subtitle?: string;
	subtitleHref?: string;
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
				className={cn(className, 'inline-flex items-center gap-1.5 hover:text-primary transition-colors')}
			>
				{title}
				<ExternalLink className='size-4 shrink-0' aria-hidden />
			</a>
		);
	}

	return <h3 className={className}>{title}</h3>;
};

const Subtitle = ({ subtitle, href }: { subtitle: string; href?: string }) => {
	if (href) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className='inline-flex items-center gap-1.5 text-base text-foreground/80 hover:text-primary transition-colors'
			>
				{subtitle}
				<ExternalLink className='size-3.5 shrink-0' aria-hidden />
			</a>
		);
	}

	return <p className='text-base text-foreground/80'>{subtitle}</p>;
};

const RowBody = ({
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
	<>
		{showLeading && leading ? <div className='mt-3'>{leading}</div> : null}
		{meta ? <p className='text-sm text-muted-foreground mt-1 md:hidden'>{meta}</p> : null}
		{body ? <p className='text-sm md:text-base text-muted-foreground mt-1 leading-relaxed'>{body}</p> : null}
		{tags && tags.length > 0 ? <TagList tags={tags} /> : null}
	</>
);

export function ContentRow({
	title,
	subtitle,
	subtitleHref,
	meta,
	body,
	tags,
	href,
	leading,
	defaultOpen = false,
}: ContentRowProps) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className='w-full py-4 md:py-5 border-b border-border last:border-b-0'>
			<div className='hidden md:flex md:items-start md:gap-6'>
				{leading ? <div className='shrink-0'>{leading}</div> : null}
				<div className='min-w-0 flex-1'>
					<Title title={title} href={href} />
					{(subtitle || meta) && (
						<div className='flex items-baseline justify-between gap-4 mt-0.5'>
							{subtitle ? <Subtitle subtitle={subtitle} href={subtitleHref} /> : <span />}
							{meta ? <p className='text-sm text-muted-foreground shrink-0 text-right'>{meta}</p> : null}
						</div>
					)}
					<RowBody body={body} tags={tags} />
				</div>
			</div>

			<Collapsible open={open} onOpenChange={setOpen} className='md:hidden'>
				<div className='flex w-full items-start justify-between gap-3'>
					<div className='min-w-0'>
						<Title title={title} href={href} />
						{subtitle ? <Subtitle subtitle={subtitle} href={subtitleHref} /> : null}
					</div>
					<CollapsibleTrigger
						className='shrink-0 rounded-md p-1 text-muted-foreground'
						aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
					>
						<ChevronDown className={cn('size-5 transition-transform', open && 'rotate-180')} />
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent>
					<RowBody meta={meta} body={body} tags={tags} leading={leading} showLeading />
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
