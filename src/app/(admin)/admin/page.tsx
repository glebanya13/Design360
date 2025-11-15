'use client';

import React, { useEffect, useState } from 'react';
import { productsService, servicesService, packagesService } from '@/lib/firebase/services';
import '@/styles/admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    packages: 0,
    loading: true
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, services, packages] = await Promise.all([
          productsService.getAll(),
          servicesService.getAll(),
          packagesService.getAll()
        ]);
        setStats({
          products: products.length,
          services: services.length,
          packages: packages.length,
          loading: false
        });
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Панель управления</h1>
      <p className="admin-page-description">
        Добро пожаловать в админ-панель Design360. Управляйте продуктами, услугами и настройками сайта.
      </p>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">🛍️</div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-value">
              {stats.loading ? '...' : stats.products}
            </h3>
            <p className="admin-stat-label">Продуктов</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">🎨</div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-value">
              {stats.loading ? '...' : stats.services}
            </h3>
            <p className="admin-stat-label">Услуг</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">📦</div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-value">
              {stats.loading ? '...' : stats.packages}
            </h3>
            <p className="admin-stat-label">Пакетов</p>
          </div>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2 className="admin-section-title">Быстрые действия</h2>
        <div className="admin-actions-grid">
          <a href="/admin/products" className="admin-action-card">
            <div className="admin-action-icon">➕</div>
            <h3>Добавить продукт</h3>
            <p>Создать новый товар в каталоге</p>
          </a>
          <a href="/admin/services" className="admin-action-card">
            <div className="admin-action-icon">➕</div>
            <h3>Добавить услугу</h3>
            <p>Добавить новую услугу</p>
          </a>
          <a href="/admin/packages" className="admin-action-card">
            <div className="admin-action-icon">➕</div>
            <h3>Добавить пакет</h3>
            <p>Создать новый пакет визуализаций</p>
          </a>
          <a href="/admin/settings" className="admin-action-card">
            <div className="admin-action-icon">⚙️</div>
            <h3>Настройки сайта</h3>
            <p>Изменить контакты и SEO</p>
          </a>
        </div>
      </div>
    </div>
  );
}

