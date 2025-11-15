'use client';

import React, { useEffect, useState } from 'react';
import { catalogCategoriesService, CatalogCategory } from '@/lib/firebase/services';
import '@/styles/admin.css';

export default function AdminCatalogCategories() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CatalogCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    order: 0
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await catalogCategoriesService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      alert('Ошибка загрузки категорий');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory?.id) {
        await catalogCategoriesService.update(editingCategory.id, {
          name: formData.name,
          order: Number(formData.order)
        });
      } else {
        await catalogCategoriesService.create({
          name: formData.name,
          order: Number(formData.order)
        });
      }
      resetForm();
      loadCategories();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения категории');
    }
  };

  const handleEdit = (category: CatalogCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      order: category.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;
    try {
      await catalogCategoriesService.delete(id);
      loadCategories();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка удаления категории');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      order: 0
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Управление категориями каталога</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Добавить категорию
        </button>
      </div>

      {showForm && (
        <div className="admin-form-modal">
          <div className="admin-form-content">
            <div className="admin-form-header">
              <h2>{editingCategory ? 'Редактировать' : 'Добавить'} категорию</h2>
              <button className="admin-form-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Название категории</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Мебель"
                />
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
                  {editingCategory ? 'Сохранить' : 'Создать'}
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
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="admin-table-empty">
                    Категории не найдены. Добавьте первую категорию.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.order || 0}</td>
                    <td>{category.name}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() => handleEdit(category)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => category.id && handleDelete(category.id)}
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

