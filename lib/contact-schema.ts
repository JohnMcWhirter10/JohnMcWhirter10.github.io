import { z } from 'zod';

export const ContactSchema = z.object({
	name: z.string().trim().min(1, 'Name is required').max(15, 'Max 15 characters'),
	email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
	message: z.string().trim().min(1, 'Message is required').max(200, 'Max 200 characters'),
});

export type ContactValues = z.infer<typeof ContactSchema>;
