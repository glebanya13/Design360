'use client';

import React, { useEffect, useState } from 'react';
import { packagesService, Package } from '@/lib/firebase/services';
import '@/styles/packages.css';

export default function VisualizationsPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const data = await packagesService.getAll();
      setPackages(data);
    } catch (error) {
      console.error('Ошибка загрузки пакетов:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="packages-page">
        <div className="packages-container">
          <div className="packages-loading">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="packages-page">
      <div className="packages-container">
        <div className="packages-header">
          <h1 className="packages-title">Выберите пакет визуализаций</h1>
          <p className="packages-subtitle">
            Подберите объём под свои задачи — одиночный заказ, небольшие партии для объявлений или массовая поставка для агентства.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.highlighted ? 'highlighted' : ''}`}
            >
              <div className="package-header">
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-audience">{pkg.targetAudience}</p>
              </div>
              <div className="package-features">
                <div className="package-visualizations">
                  {(() => {
                    const getVisualizationWord = (qty: number | string): string => {
                      const num = typeof qty === 'string' ? parseInt(qty) : qty;
                      if (isNaN(num)) return 'визуализаций';
                      if (num === 1) return 'визуализация';
                      if (num >= 2 && num <= 4) return 'визуализации';
                      return 'визуализаций';
                    };
                    return `${pkg.visualizations} ${getVisualizationWord(pkg.visualizations)}`;
                  })()}
                </div>
                <div className="package-price">{pkg.price}</div>
              </div>
              <p className="package-description">{pkg.description}</p>
              <button className="package-button btn btn-primary">
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

