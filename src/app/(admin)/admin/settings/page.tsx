'use client';

import React, { useEffect, useState } from 'react';
import { settingsService, SiteSettings } from '@/lib/firebase/services';
import '@/styles/admin.css';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    site: {
      title: '',
      description: '',
      phone: '',
      email: '',
      address: ''
    },
    settings: {
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#64748b',
        accentColor: '#f59e0b'
      },
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      },
      contact: {
        workingHours: '',
        socialMedia: {
          instagram: '',
          telegram: '',
          whatsapp: ''
        }
      }
    }
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settings = await settingsService.get();
      if (settings) {
        setFormData({
          site: settings.site,
          settings: {
            ...settings.settings,
            seo: {
              ...settings.settings.seo,
              keywords: settings.settings.seo.keywords.join(', ')
            }
          }
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
      alert('Ошибка загрузки настроек');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const keywords = formData.settings.seo.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      await settingsService.update({
        site: formData.site,
        settings: {
          ...formData.settings,
          seo: {
            ...formData.settings.seo,
            keywords
          }
        }
      });
      alert('Настройки сохранены!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения настроек');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string[], value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  if (loading) {
    return <div className="admin-loading">Загрузка настроек...</div>;
  }

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Настройки сайта</h1>
      <p className="admin-page-description">
        Управляйте основной информацией, контактами и SEO настройками сайта.
      </p>

      <form onSubmit={handleSubmit} className="admin-settings-form">
        <section className="admin-settings-section">
          <h2 className="admin-settings-section-title">Информация о сайте</h2>
          <div className="admin-form-group">
            <label>Название сайта</label>
            <input
              type="text"
              value={formData.site.title}
              onChange={(e) => updateField(['site', 'title'], e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Описание</label>
            <textarea
              value={formData.site.description}
              onChange={(e) => updateField(['site', 'description'], e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="admin-form-group">
            <label>Телефон</label>
            <input
              type="text"
              value={formData.site.phone}
              onChange={(e) => updateField(['site', 'phone'], e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.site.email}
              onChange={(e) => updateField(['site', 'email'], e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Адрес</label>
            <input
              type="text"
              value={formData.site.address}
              onChange={(e) => updateField(['site', 'address'], e.target.value)}
              required
            />
          </div>
        </section>

        <section className="admin-settings-section">
          <h2 className="admin-settings-section-title">SEO настройки</h2>
          <div className="admin-form-group">
            <label>Meta Title</label>
            <input
              type="text"
              value={formData.settings.seo.metaTitle}
              onChange={(e) => updateField(['settings', 'seo', 'metaTitle'], e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Meta Description</label>
            <textarea
              value={formData.settings.seo.metaDescription}
              onChange={(e) => updateField(['settings', 'seo', 'metaDescription'], e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="admin-form-group">
            <label>Ключевые слова (через запятую)</label>
            <input
              type="text"
              value={formData.settings.seo.keywords}
              onChange={(e) => updateField(['settings', 'seo', 'keywords'], e.target.value)}
              required
            />
          </div>
        </section>

        <section className="admin-settings-section">
          <h2 className="admin-settings-section-title">Контакты</h2>
          <div className="admin-form-group">
            <label>Часы работы</label>
            <input
              type="text"
              value={formData.settings.contact.workingHours}
              onChange={(e) => updateField(['settings', 'contact', 'workingHours'], e.target.value)}
              required
              placeholder="Пн-Пт: 9:00-18:00, Сб: 10:00-16:00"
            />
          </div>
          <div className="admin-form-group">
            <label>Instagram</label>
            <input
              type="text"
              value={formData.settings.contact.socialMedia.instagram}
              onChange={(e) => updateField(['settings', 'contact', 'socialMedia', 'instagram'], e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Telegram</label>
            <input
              type="text"
              value={formData.settings.contact.socialMedia.telegram}
              onChange={(e) => updateField(['settings', 'contact', 'socialMedia', 'telegram'], e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>WhatsApp</label>
            <input
              type="text"
              value={formData.settings.contact.socialMedia.whatsapp}
              onChange={(e) => updateField(['settings', 'contact', 'socialMedia', 'whatsapp'], e.target.value)}
            />
          </div>
        </section>

        <section className="admin-settings-section">
          <h2 className="admin-settings-section-title">Цветовая схема</h2>
          <div className="admin-form-group">
            <label>Основной цвет</label>
            <input
              type="color"
              value={formData.settings.theme.primaryColor}
              onChange={(e) => updateField(['settings', 'theme', 'primaryColor'], e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Вторичный цвет</label>
            <input
              type="color"
              value={formData.settings.theme.secondaryColor}
              onChange={(e) => updateField(['settings', 'theme', 'secondaryColor'], e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Акцентный цвет</label>
            <input
              type="color"
              value={formData.settings.theme.accentColor}
              onChange={(e) => updateField(['settings', 'theme', 'accentColor'], e.target.value)}
            />
          </div>
        </section>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить настройки'}
          </button>
        </div>
      </form>
    </div>
  );
}

