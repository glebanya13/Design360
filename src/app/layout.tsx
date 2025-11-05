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
