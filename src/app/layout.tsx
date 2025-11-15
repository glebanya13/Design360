import type { Metadata } from 'next';
import '@/styles/variables.css';
import '@/styles/globals.css';
import '@/styles/Buttons.css';
import '@/styles/Cards.css';
import '@/styles/Forms.css';
import '@/styles/header.css';
import '@/styles/footer.css';

export const metadata: Metadata = {
    title: 'Design360 - Профессиональный дизайн интерьера',
    description: 'Создаем интерьеры мечты. Дизайн-проекты, консультации, 3D визуализация. Более 500 проектов.',
    keywords: ['дизайн интерьера', '3D визуализация', 'дизайн-проект', 'консультация дизайнера'],
    icons: {
        icon: [
            { url: '/icon.svg', type: 'image/svg+xml' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/icons/icon-120x120.svg', sizes: '120x120', type: 'image/svg+xml' },
            { url: '/AppIcons/Assets.xcassets/AppIcon.appiconset/120.png', sizes: '120x120', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: '/icon.svg',
    },
    manifest: '/manifest.json',
    other: {
        'geo.region': 'RU-KGD',
        'geo.placename': 'Калининград',
        'geo.position': '54.7104;20.4522',
        'ICBM': '54.7104, 20.4522',
    },
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Дизайн360',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
