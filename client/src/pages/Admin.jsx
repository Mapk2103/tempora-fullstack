import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import {
  handleProductImageError,
  resolveProductImage
} from '../utils/productImages';
import { getProductCategory } from '../utils/productContent';
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
      setError('Unable to load products');
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
        setSuccess('Product updated successfully');
      } else {
        await productsAPI.create(productData);
        setSuccess('Product created successfully');
      }

      fetchProducts();
      resetForm();
    } catch {
      setError('Unable to save the product');
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);
        setSuccess('Product deleted successfully');
        fetchProducts();
      } catch (err) {
        setError('Unable to delete the product');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administration Panel</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Product'}
        </button>
      </div>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      {showForm && (
        <div className="product-form-card">
          <h2>{editingProduct ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="E.g. Omega Seamaster"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (USD) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="E.g. 15000.00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the watch's defining characteristics..."
                required
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="E.g. /assets/img/watch4.jpg"
                  required
                />
                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                  Use paths such as: /assets/img/watch-name.jpg
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="E.g. 10"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Product Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="reloj-oro">Gold Watch</option>
                <option value="reloj-acero">Steel Watch</option>
                <option value="reloj-clasico">Classic Watch</option>
                <option value="reloj-deportivo">Sport Watch</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="features">Product Features (comma-separated)</label>
              <input
                type="text"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="E.g. Water resistant, Chronograph, 18K gold, 5-year warranty"
              />
              <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                Separate each feature with a comma (,)
              </small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Update' : 'Create'} Product
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table">
        <h2>Products ({products.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={resolveProductImage(product.image)}
                    onError={handleProductImageError}
                    alt={product.name}
                    className="product-thumbnail"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{getProductCategory(product.category)}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(product._id)}>
                    Delete
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
