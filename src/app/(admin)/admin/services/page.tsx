'use client';

import React, { useEffect, useState } from 'react';
import { servicesService, Service } from '@/lib/firebase/services';
import '@/styles/admin.css';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    features: ''
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getAll();
      setServices(data);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
      alert('Ошибка загрузки услуг');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const features = formData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      if (editingService?.id) {
        await servicesService.update(editingService.id, {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          features
        });
      } else {
        await servicesService.create({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          features
        });
      }
      resetForm();
      loadServices();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения услуги');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features.join('\n')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту услугу?')) return;
    try {
      await servicesService.delete(id);
      loadServices();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка удаления услуги');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      features: ''
    });
    setEditingService(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Управление услугами</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Добавить услугу
        </button>
      </div>

      {showForm && (
        <div className="admin-form-modal">
          <div className="admin-form-content">
            <div className="admin-form-header">
              <h2>{editingService ? 'Редактировать' : 'Добавить'} услугу</h2>
              <button className="admin-form-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Название</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="admin-form-group">
                <label>Цена</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="от 2 500 ₽/м²"
                />
              </div>
              <div className="admin-form-group">
                <label>Особенности (каждая с новой строки)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={5}
                  placeholder="Обмерный план&#10;3D визуализация&#10;Подбор материалов"
                />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingService ? 'Сохранить' : 'Создать'}
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
                <th>ID</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Особенности</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-table-empty">
                    Услуги не найдены
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.title}</td>
                    <td>{service.price}</td>
                    <td>{service.features.length} пунктов</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() => handleEdit(service)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => service.id && handleDelete(service.id)}
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

