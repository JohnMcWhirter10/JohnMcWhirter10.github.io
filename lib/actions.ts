'use server';

import { neon } from '@neondatabase/serverless';
import { headers } from 'next/headers';
import { ContactSchema } from '@/lib/contact-schema';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
	if (recent.length >= MAX_REQUESTS) {
		hits.set(ip, recent);
		return true;
	}
	recent.push(now);
	hits.set(ip, recent);
	return false;
}

export async function create(formData: FormData) {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error('Failed to save form submission');
	}

	const headerStore = await headers();
	const ip =
		headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		headerStore.get('x-real-ip') ||
		'unknown';

	if (isRateLimited(ip)) {
		throw new Error('Failed to save form submission');
	}

	const parsed = ContactSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		message: formData.get('message'),
	});

	if (!parsed.success) {
		throw new Error('Failed to save form submission');
	}

	const sql = neon(databaseUrl);

	try {
		await sql('INSERT INTO form_submissions (name, email, message) VALUES ($1, $2, $3)', [
			parsed.data.name,
			parsed.data.email,
			parsed.data.message,
		]);
	} catch (error) {
		console.error('Error inserting form data:', error);
		throw new Error('Failed to save form submission');
	}
}
