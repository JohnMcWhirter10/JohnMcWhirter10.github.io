'use client';
import { useRef, useState } from 'react';
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from '@/lib/actions';
import { ContactSchema, type ContactValues } from '@/lib/contact-schema';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useInView } from 'framer-motion';
import { SectionContentProps } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Connect = ({ content }: SectionContentProps) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });
	const [formSubmitted, setFormSubmitted] = useState('');
	const form = useForm({
		resolver: zodResolver(ContactSchema),
		defaultValues: { name: '', email: '', message: '' },
	});

	const onSubmit = async (values: ContactValues) => {
		try {
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('email', values.email);
			formData.append('message', values.message);
			await create(formData);
			setFormSubmitted(values.name);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const socialLinks = [
		{
			href: 'https://www.linkedin.com/in/johnbreamcwhirter/',
			icon: LinkedinIcon,
			label: 'LinkedIn',
			color: 'bg-[#0077B5] hover:bg-[#0077B5]/80',
		},
		{
			href: 'https://www.instagram.com/itsjohnbrea/',
			icon: InstagramIcon,
			label: 'Instagram',
			color: 'bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
		},
		{
			href: 'https://github.com/JohnMcWhirter10',
			icon: GithubIcon,
			label: 'GitHub',
			color: 'bg-[#333] hover:bg-[#333]/80',
		},
	];

	return (
		<div ref={ref} className='w-full max-w-4xl mx-auto px-4 sm:px-6'>
			<div className='flex flex-col md:flex-row gap-6'>
				<motion.div
					className='md:w-1/2 w-full'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.4, delay: 0.1 }}
				>
					<Card className='h-full border-2 border-primary shadow-md'>
						<CardHeader className='pb-2'>
							<CardTitle className='text-xl'>Get In Touch</CardTitle>
						</CardHeader>
						<CardContent>
							{formSubmitted ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									className='flex flex-col items-center text-center py-6'
								>
									<MailIcon className='h-8 w-8 text-green-600 mb-2' />
									<h3 className='text-lg font-medium'>Message Sent!</h3>
									<p className='text-muted-foreground'>
										Thanks, {formSubmitted}! I&apos;ll be in touch soon.
									</p>
								</motion.div>
							) : (
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
										{['name', 'email', 'message'].map((field) => (
											<FormField
												key={field}
												control={form.control}
												name={field as 'name' | 'email' | 'message'}
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{field.name.charAt(0).toUpperCase() + field.name.slice(1)}
														</FormLabel>
														<FormControl>
															{field.name === 'message' ? (
																<Textarea
																	{...field}
																	rows={3}
																	placeholder='Your Message'
																	maxLength={200}
																	className='resize-none'
																/>
															) : (
																<Input
																	{...field}
																	placeholder={`Your ${
																		field.name.charAt(0).toUpperCase() +
																		field.name.slice(1)
																	}`}
																/>
															)}
														</FormControl>
														<FormMessage className='text-right text-xs text-red-500' />
													</FormItem>
												)}
											/>
										))}
										<Button type='submit' className='w-full py-5 flex items-center gap-2'>
											Send Message <Send size={16} />
										</Button>
									</form>
								</Form>
							)}
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					className='md:w-1/2 w-full'
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<Card className='h-full border-2 border-primary shadow-md'>
						<CardHeader className='pb-2'>
							<CardTitle className='text-xl'>Connect With Me</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div>
									<h3 className='font-medium mb-2'>Social Media</h3>
									<TooltipProvider delayDuration={0}>
										<div className='flex gap-3'>
											{socialLinks.map(({ href, icon: Icon, label, color }, idx) => (
												<Tooltip key={idx}>
													<TooltipTrigger asChild>
														<Button
															asChild
															variant='outline'
															size='icon'
															className='rounded-lg p-0'
														>
															<Link
																href={href}
																target='_blank'
																className={`w-9 h-9 flex items-center justify-center rounded-lg text-white ${color}`}
															>
																<Icon size={18} />
															</Link>
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p>{label}</p>
													</TooltipContent>
												</Tooltip>
											))}
										</div>
									</TooltipProvider>
								</div>

								<div className='flex items-center'>
									<MapPin size={18} className='mr-2 text-muted-foreground' />
									<p className='text-muted-foreground'>Lubbock, Texas</p>
								</div>

								<p className='text-sm text-muted-foreground pt-2'>{content}</p>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
};

export default Connect;
