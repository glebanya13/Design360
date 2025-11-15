'use client';

import React, { useState } from 'react';
import { settingsService, productsService, catalogCategoriesService, serviceCategoriesService, packagesService } from '@/lib/firebase/services';
import productsData from '@/data/products.json';
import '@/styles/admin.css';

export default function ImportDataPage() {
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<string>('');

  const importSettings = async () => {
    try {
      const siteData = {
        site: {
          title: 'Дизайн360',
          description: 'Профессиональные услуги по дизайну интерьера',
          phone: '+7 (911) 493-46-41',
          email: '89114934641@bk.ru',
          address: 'Калининград, Медовый мост'
        },
        settings: {
          theme: {
            primaryColor: '#2563eb',
            secondaryColor: '#64748b',
            accentColor: '#f59e0b'
          },
          seo: {
            metaTitle: 'Дизайн360 - Профессиональный дизайн интерьера',
            metaDescription: 'Создаем интерьеры мечты. Дизайн-проекты, консультации, 3D визуализация. Более 500 проектов.',
            keywords: ['дизайн интерьера', '3D визуализация', 'дизайн-проект', 'консультация дизайнера']
          },
          contact: {
            workingHours: 'Пн-Пт: 9:00-18:00',
            socialMedia: {
              instagram: '@design360',
              telegram: '@design360_support',
              whatsapp: '+7 (999) 123-45-67'
            }
          }
        }
      };

      await settingsService.update(siteData);
      return 'Настройки импортированы';
    } catch (error) {
      throw new Error('Ошибка импорта настроек: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const importProducts = async () => {
    try {
      const products = productsData.products;
      let imported = 0;
      let skipped = 0;

      for (const product of products) {
        try {
          await productsService.create({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            slug: product.slug,
            subcategory: product.subcategory,
            inStock: product.inStock !== undefined ? product.inStock : true,
            oldPrice: product.oldPrice,
            badge: product.badge
          });
          imported++;
        } catch (error) {
          skipped++;
          console.warn(`Пропущен продукт ${product.name}:`, error);
        }
      }

      return `Импортировано ${imported} продуктов${skipped > 0 ? `, пропущено ${skipped}` : ''}`;
    } catch (error) {
      throw new Error('Ошибка импорта продуктов: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const importCatalogCategories = async () => {
    try {
      const categories = [
        { name: 'Мебель', order: 1 },
        { name: 'Декор', order: 2 },
        { name: 'Освещение', order: 3 },
        { name: 'Текстиль', order: 4 },
        { name: 'Для бизнеса', order: 5 },
      ];

      for (const category of categories) {
        await catalogCategoriesService.create(category);
      }
      return `Импортировано ${categories.length} категорий каталога`;
    } catch (error) {
      throw new Error('Ошибка импорта категорий каталога: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const importServiceCategories = async () => {
    try {
      const categories = [
        { name: 'Дизайн интерьера', route: '/design-interior', order: 1 },
        { name: 'Проектирование', order: 2 },
        { name: 'Консультации', order: 3 },
        { name: '3D визуализация', order: 4 },
        { name: 'Авторский надзор', order: 5 },
        { name: 'Для бизнеса', order: 6 },
        { name: 'Для профессионалов', order: 7 },
        { name: 'Электроснабжение', route: '/elektrosnabzhenie', order: 8 },
      ];

      for (const category of categories) {
        await serviceCategoriesService.create(category);
      }
      return `Импортировано ${categories.length} категорий услуг`;
    } catch (error) {
      throw new Error('Ошибка импорта категорий услуг: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const importPackages = async () => {
    try {
      const packages = [
        {
          name: 'Базовый',
          targetAudience: 'Для начинающих риелторов',
          visualizations: 3,
          price: '3 900 Р',
          description: 'Идеально для небольших объектов',
          highlighted: false,
          order: 1
        },
        {
          name: 'Стандарт',
          targetAudience: 'Для активных риелторов',
          visualizations: 5,
          price: '5 900 Р',
          description: 'Оптимальный выбор для большинства проектов',
          highlighted: false,
          order: 2
        },
        {
          name: 'Профи',
          targetAudience: 'Для профессионалов',
          visualizations: '10+',
          price: 'от 1 190 Р / шт.',
          description: 'Оптовые цены для больших объемов',
          highlighted: true,
          order: 3
        }
      ];

      for (const pkg of packages) {
        await packagesService.create(pkg);
      }
      return `Импортировано ${packages.length} пакетов`;
    } catch (error) {
      throw new Error('Ошибка импорта пакетов: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleImportAll = async () => {
    if (!confirm('Вы уверены, что хотите импортировать все данные? Это может перезаписать существующие данные.')) {
      return;
    }

    setImporting(true);
    setStatus('');

    try {
      const results: string[] = [];

      setStatus('Импорт настроек...');
      results.push(await importSettings());

      setStatus('Импорт продуктов...');
      results.push(await importProducts());

      setStatus('Импорт категорий каталога...');
      results.push(await importCatalogCategories());

      setStatus('Импорт категорий услуг...');
      results.push(await importServiceCategories());

      setStatus('Импорт пакетов...');
      results.push(await importPackages());

      setStatus('✅ Импорт завершен успешно!\n\n' + results.join('\n'));
    } catch (error) {
      setStatus('❌ Ошибка: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Импорт данных в Firebase</h1>
      <p className="admin-page-description">
        Импортируйте все данные из JSON файлов в Firebase Firestore.
      </p>

      <div className="admin-settings-section" style={{ marginTop: '2rem' }}>
        <h2 className="admin-settings-section-title">Что будет импортировано:</h2>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>📝 <strong>Настройки сайта</strong> - контакты, SEO, цветовая схема</li>
          <li>🛍️ <strong>Продукты</strong> - все товары из каталога ({productsData.products.length} шт.)</li>
          <li>📁 <strong>Категории каталога</strong> - Мебель, Декор, Освещение, Текстиль, Для бизнеса</li>
          <li>🏷️ <strong>Категории услуг</strong> - 8 категорий с маршрутами</li>
          <li>📦 <strong>Пакеты визуализаций</strong> - Базовый, Стандарт, Профи</li>
        </ul>
      </div>

      <div className="admin-settings-section" style={{ marginTop: '2rem' }}>
        <h2 className="admin-settings-section-title">Контакты (реальные данные):</h2>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>📞 Телефон: <strong>+7 (911) 493-46-41</strong></li>
          <li>📧 Email: <strong>89114934641@bk.ru</strong></li>
          <li>📍 Адрес: <strong>Калининград, Медовый мост</strong></li>
          <li>🕐 Часы работы: <strong>Пн-Пт: 9:00-18:00</strong></li>
        </ul>
      </div>

      <div className="admin-form-actions" style={{ marginTop: '2rem' }}>
        <button
          className="btn btn-primary"
          onClick={handleImportAll}
          disabled={importing}
        >
          {importing ? 'Импорт...' : '🚀 Импортировать все данные'}
        </button>
      </div>

      {status && (
        <div
          className="admin-settings-section"
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: status.includes('✅') ? '#d1fae5' : status.includes('❌') ? '#fee2e2' : '#e0e7ff',
            borderRadius: '8px',
            whiteSpace: 'pre-line'
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}

