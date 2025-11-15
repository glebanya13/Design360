'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { path: '/admin', label: 'Главная', icon: '📊' },
    { path: '/admin/products', label: 'Продукты', icon: '🛍️' },
    { path: '/admin/services', label: 'Услуги', icon: '🎨' },
    { path: '/admin/packages', label: 'Пакеты', icon: '📦' },
    { path: '/admin/catalog-categories', label: 'Категории каталога', icon: '📁' },
    { path: '/admin/service-categories', label: 'Категории услуг', icon: '🏷️' },
    { path: '/admin/settings', label: 'Настройки', icon: '⚙️' },
    { path: '/admin/import-data', label: 'Импорт данных', icon: '📥' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="admin-layout" suppressHydrationWarning>
      <aside className="admin-sidebar" suppressHydrationWarning>
        <div className="admin-sidebar-header" suppressHydrationWarning>
          <Link href="/admin" className="admin-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="7.010000228881836 5 87.93101501464844 90"
              width="24"
              height="24"
            >
              <g fill="url(#SvgjsLinearGradient1000)">
                <path d="M50.98 5c-2.521 0-5 .21-7.411.63C22.84 9.16 7.01 27.26 7.01 48.97c0 14.129 6.7 26.73 17.1 34.78-9.84.98-16.58 2.98-16.58 5.3 0 3.29 13.55 5.95 30.26 5.95 15.96 0 30.71-2.94 30.39-5.59A44.156 44.156 0 0 0 85.85 75.7a43.699 43.699 0 0 0 9.091-26.73C94.94 24.73 75.21 5 50.98 5zm20.17 77.08c-2.79.6-5.68.92-8.65.92-22.64 0-41-18.36-41-41 0-10 3.58-19.17 9.54-26.29a38.47 38.47 0 0 1 19.94-5.54c21.39 0 38.789 17.4 38.789 38.8.001 14-7.459 26.3-18.619 33.11z"></path>
              </g>
              <defs>
                <linearGradient id="SvgjsLinearGradient1000">
                  <stop stopColor="#2563eb" offset="0"></stop>
                  <stop stopColor="#1d4ed8" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
            <span>Админка</span>
          </Link>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-back-link">
            ← Вернуться на сайт
          </Link>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}

