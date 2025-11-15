'use client';

import React, { useEffect, useState } from 'react';
import { packagesService, Package } from '@/lib/firebase/services';
import '@/styles/admin.css';

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAudience: '',
    visualizations: '',
    price: '',
    description: '',
    highlighted: false,
    order: 0
  });

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
      alert('Ошибка загрузки пакетов');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const visualizations = formData.visualizations.includes('+') 
        ? formData.visualizations 
        : Number(formData.visualizations);

      if (editingPackage?.id) {
        await packagesService.update(editingPackage.id, {
          name: formData.name,
          targetAudience: formData.targetAudience,
          visualizations,
          price: formData.price,
          description: formData.description,
          highlighted: formData.highlighted,
          order: Number(formData.order)
        });
      } else {
        await packagesService.create({
          name: formData.name,
          targetAudience: formData.targetAudience,
          visualizations,
          price: formData.price,
          description: formData.description,
          highlighted: formData.highlighted,
          order: Number(formData.order)
        });
      }
      resetForm();
      loadPackages();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения пакета');
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      targetAudience: pkg.targetAudience,
      visualizations: typeof pkg.visualizations === 'string' ? pkg.visualizations : pkg.visualizations.toString(),
      price: pkg.price,
      description: pkg.description,
      highlighted: pkg.highlighted || false,
      order: pkg.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот пакет?')) return;
    try {
      await packagesService.delete(id);
      loadPackages();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка удаления пакета');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      targetAudience: '',
      visualizations: '',
      price: '',
      description: '',
      highlighted: false,
      order: 0
    });
    setEditingPackage(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Управление пакетами визуализаций</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Добавить пакет
        </button>
      </div>

      {showForm && (
        <div className="admin-form-modal">
          <div className="admin-form-content">
            <div className="admin-form-header">
              <h2>{editingPackage ? 'Редактировать' : 'Добавить'} пакет</h2>
              <button className="admin-form-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Базовый"
                />
              </div>
              <div className="admin-form-group">
                <label>Целевая аудитория</label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  required
                  placeholder="Для единичных заказов"
                />
              </div>
              <div className="admin-form-group">
                <label>Количество визуализаций (число или "10+")</label>
                <input
                  type="text"
                  value={formData.visualizations}
                  onChange={(e) => setFormData({ ...formData, visualizations: e.target.value })}
                  required
                  placeholder="1 или 10+"
                />
              </div>
              <div className="admin-form-group">
                <label>Цена</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="1390 Р или от 1190 Р / шт."
                />
              </div>
              <div className="admin-form-group">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  placeholder="Оплатите и получите готовый файл JPG/PNG высокого качества"
                />
              </div>
              <div className="admin-form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.highlighted}
                    onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                  />
                  {' '}Выделить пакет (для пакета "Профи")
                </label>
              </div>
              <div className="admin-form-group">
                <label>Порядок сортировки</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  required
                  min="0"
                />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingPackage ? 'Сохранить' : 'Создать'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Загрузка...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Порядок</th>
                <th>Название</th>
                <th>Аудитория</th>
                <th>Визуализации</th>
                <th>Цена</th>
                <th>Выделен</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {packages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="admin-table-empty">
                    Пакеты не найдены. Добавьте первый пакет.
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>{pkg.order || 0}</td>
                    <td>{pkg.name}</td>
                    <td>{pkg.targetAudience}</td>
                    <td>{pkg.visualizations}</td>
                    <td>{pkg.price}</td>
                    <td>{pkg.highlighted ? '✓' : ''}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() => handleEdit(pkg)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => pkg.id && handleDelete(pkg.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

