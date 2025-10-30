import React from 'react';
import { Package, DollarSign, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useProductos } from '../../hooks/useApi';
import './Lists.css';

const ProductosList: React.FC = () => {
  const { productos, loading, error, refetch } = useProductos();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="list-container">
        <div className="list-header">
          <h2 className="list-title">
            <Package className="title-icon" />
            Lista de Productos
          </h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-container">
        <div className="list-header">
          <h2 className="list-title">
            <Package className="title-icon" />
            Lista de Productos
          </h2>
        </div>
        <div className="error-state">
          <p className="error-message">Error: {error}</p>
          <button onClick={refetch} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">
          <Package className="title-icon" />
          Lista de Productos
        </h2>
        <div className="list-actions">
          <button className="add-button">
            <Plus size={16} />
            Nuevo Producto
          </button>
        </div>
        <div className="list-stats">
          <span className="stat-item">
            Total: {productos.length} productos
          </span>
        </div>
      </div>

      {productos.length === 0 ? (
        <div className="empty-state">
          <Package size={64} className="empty-icon" />
          <h3>No hay productos registrados</h3>
          <p>Los productos que registres aparecerán aquí</p>
          <button className="add-button">
            <Plus size={16} />
            Agregar primer producto
          </button>
        </div>
      ) : (
        <div className="list-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Precio Unitario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <span className="id-badge">#{producto.id}</span>
                    </td>
                    <td>
                      <div className="product-cell">
                        <Package size={16} />
                        <div className="product-info">
                          <span className="product-name">
                            {producto.descripcion}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="price-cell">
                        <DollarSign size={16} />
                        {formatPrice(producto.precioUnitario)}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button 
                          className="action-button view"
                          title="Ver detalles"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-button edit"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="action-button delete"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosList;