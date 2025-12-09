import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import '../components/css/admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'reloj-oro',
    stock: '',
    features: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.products);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'reloj-oro',
      stock: '',
      features: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (editingProduct) {
        await productsAPI.update(editingProduct._id, productData);
        setSuccess('Producto actualizado exitosamente');
      } else {
        await productsAPI.create(productData);
        setSuccess('Producto creado exitosamente');
      }

      fetchProducts();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
      features: product.features.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      try {
        await productsAPI.delete(id);
        setSuccess('Producto eliminado exitosamente');
        fetchProducts();
      } catch (err) {
        setError('Error al eliminar producto');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      {showForm && (
        <div className="product-form-card">
          <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre del Producto *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Reloj Omega Seamaster"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Precio (USD) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="Ej: 15000.00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción del Producto *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe las características principales del reloj..."
                required
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image">URL de la Imagen *</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Ej: /assets/img/reloj4.jpg"
                  required
                />
                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                  Usa rutas como: /assets/img/nombredelreloj.jpg
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Cantidad en Stock *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Ej: 10"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría del Producto *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="reloj-oro">Reloj de Oro</option>
                <option value="reloj-acero">Reloj de Acero</option>
                <option value="reloj-clasico">Reloj Clásico</option>
                <option value="reloj-deportivo">Reloj Deportivo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="features">Características del Producto (separadas por comas)</label>
              <input
                type="text"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="Ej: Resistente al agua, Cronógrafo, Oro 18K, Garantía 5 años"
              />
              <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                Separa cada característica con una coma (,)
              </small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Actualizar' : 'Crear'} Producto
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table">
        <h2>Productos ({products.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.image} alt={product.name} className="product-thumbnail" />
                </td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(product)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(product._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
