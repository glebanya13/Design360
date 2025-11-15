'use client';

import React, { useEffect } from 'react';
import { settingsService } from '@/lib/firebase/services';

export const SiteSettings: React.FC = () => {
  useEffect(() => {
    loadAndApplySettings();
  }, []);

  // Функция для затемнения цвета
  const adjustBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const loadAndApplySettings = async () => {
    try {
      const settings = await settingsService.get();
      if (settings?.settings?.theme) {
        // Применяем цветовую схему через CSS переменные
        const root = document.documentElement;
        root.style.setProperty('--primary', settings.settings.theme.primaryColor);
        root.style.setProperty('--primary-dark', adjustBrightness(settings.settings.theme.primaryColor, -10));
        root.style.setProperty('--secondary', settings.settings.theme.secondaryColor);
        root.style.setProperty('--accent', settings.settings.theme.accentColor);
      }

      // Применяем SEO настройки (динамически обновляем title и meta)
      if (settings?.settings?.seo) {
        if (settings.settings.seo.metaTitle) {
          document.title = settings.settings.seo.metaTitle;
        }
        
        // Обновляем meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        if (settings.settings.seo.metaDescription) {
          metaDescription.setAttribute('content', settings.settings.seo.metaDescription);
        }

        // Обновляем meta keywords
        if (settings.settings.seo.keywords && settings.settings.seo.keywords.length > 0) {
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.setAttribute('content', settings.settings.seo.keywords.join(', '));
        }
      }

      // Добавляем мета-теги для региона (Калининград)
      const addOrUpdateMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      addOrUpdateMeta('geo.region', 'RU-KGD');
      addOrUpdateMeta('geo.placename', 'Калининград');
      addOrUpdateMeta('geo.position', '54.7104;20.4522');
      addOrUpdateMeta('ICBM', '54.7104, 20.4522');
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
    }
  };

  return null; // Компонент не рендерит ничего видимого
};

export default SiteSettings;

