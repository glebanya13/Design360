import React from 'react';
import { Header, Footer } from '@/components/layout';
import ScrollToTop from '@/components/layout/ScrollToTop/ScrollToTop';
import SiteSettings from '@/components/layout/SiteSettings/SiteSettings';
import styles from './layout.module.css';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layout}>
            <SiteSettings />
            <ScrollToTop />
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
}



