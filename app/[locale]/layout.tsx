import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from './providers';
import '../globals.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://lena-homestead.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(appUrl),
    title: {
        default: 'Lena Homestead',
        template: '%s | Lena Homestead',
    },
    description:
        'Lena Homestead is a family-friendly learning and adventure space with stories, quests, and parent tools.',
    applicationName: 'Lena Homestead',
    openGraph: {
        title: 'Lena Homestead',
        description:
            'A family-friendly learning and adventure space with stories, quests, and parent tools.',
        url: appUrl,
        siteName: 'Lena Homestead',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Lena Homestead',
        description:
            'A family-friendly learning and adventure space with stories, quests, and parent tools.',
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className="light">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Providers>{children}</Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
