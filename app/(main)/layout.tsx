import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-heading',
});

// Add a separate viewport export for Next.js 13+
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	title: 'John McWhirter | Software Engineer & Developer',
	description:
		'Portfolio showcasing my skills, projects, and experience as a software engineer specializing in web application development.',
	keywords: [
		'software engineer',
		'web developer',
		'react',
		'next.js',
		'portfolio',
		'projects',
		'front-end developer',
		'full-stack developer',
		'TypeScript developer',
		'UI/UX designer',
	],
	authors: [{ name: 'John McWhirter', url: 'https://github.com/JohnMcWhirter10' }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://johnbreamcwhirter.com',
		title: 'John McWhirter | Software Engineer & Developer',
		description:
			'Portfolio showcasing my skills, projects, and experience as a software engineer specializing in web application development.',
		siteName: 'John McWhirter Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'John McWhirter Portfolio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'John McWhirter | Software Engineer & Developer',
		description:
			'Portfolio showcasing my skills, projects, and experience as a software engineer specializing in web application development.',
		creator: '@johnmcwhirter',
		images: ['/og-image.jpg'],
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://johnbreamcwhirter.com'),
	alternates: {
		canonical: '/',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
			<body className='select-none font-sans antialiased transition-colors' suppressHydrationWarning>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem themes={['light', 'dark']}>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
