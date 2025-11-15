'use client';

import React, { useEffect, useState } from 'react';
import { productsService, Product } from '@/lib/firebase/services';
import '@/styles/admin.css';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
      alert('Ошибка загрузки продуктов');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct?.id) {
        await productsService.update(editingProduct.id, {
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          image: formData.image,
          description: formData.description
        });
      } else {
        await productsService.create({
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          image: formData.image,
          description: formData.description
        });
      }
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения продукта');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      description: product.description
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот продукт?')) return;
    try {
      await productsService.delete(id);
      loadProducts();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка удаления продукта');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Управление продуктами</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Добавить продукт
        </button>
      </div>

      {showForm && (
        <div className="admin-form-modal">
          <div className="admin-form-content">
            <div className="admin-form-header">
              <h2>{editingProduct ? 'Редактировать' : 'Добавить'} продукт</h2>
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
                />
              </div>
              <div className="admin-form-group">
                <label>Цена</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Изображение (URL)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Сохранить' : 'Создать'}
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
                <th>Категория</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-table-empty">
                    Продукты не найдены
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString()} ₽</td>
                    <td>{product.category}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() => handleEdit(product)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => product.id && handleDelete(product.id)}
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

