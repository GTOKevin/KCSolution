import React from 'react';
import { X, Calendar, User, DollarSign, Package, ShoppingCart, Loader2 } from 'lucide-react';
import { usePedidoById } from '../hooks/useApi';

interface PedidoDetailsProps {
  pedidoId: number;
  onClose: () => void;
}

const PedidoDetails: React.FC<PedidoDetailsProps> = ({ pedidoId, onClose }) => {
  const { pedido, loading, error } = usePedidoById(pedidoId);
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              <Package className="title-icon" />
              Cargando detalles del pedido...
            </h2>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="loading-container">
              <Loader2 className="spinner" size={32} />
              <p>Cargando información del pedido...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar estado de error
  if (error) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              <Package className="title-icon" />
              Error al cargar pedido
            </h2>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay pedido, no mostrar nada
  if (!pedido) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <Package className="title-icon" />
            Detalles del Pedido #{pedido.id}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Información general del pedido */}
          <div className="pedido-info-section">
            <h3 className="section-title">Información General</h3>
            <div className="info-grid">
              <div className="info-item">
                <Calendar size={16} />
                <div>
                  <label>Fecha del Pedido</label>
                  <span>{formatDate(pedido.fecha)}</span>
                </div>
              </div>
              <div className="info-item">
                <User size={16} />
                <div>
                  <label>Cliente</label>
                  <span>{pedido.clienteNombre} {pedido.clienteApellido}</span>
                </div>
              </div>
              <div className="info-item">
                <DollarSign size={16} />
                <div>
                  <label>Total del Pedido</label>
                  <span className="total-amount">{formatPrice(pedido.precioTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de productos */}
          <div className="pedido-details-section">
            <h3 className="section-title">
              <ShoppingCart size={16} />
              Productos del Pedido
            </h3>
            <div className="details-table-container">
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.detalles.map((detalle) => (
                    <tr key={detalle.id}>
                      <td className="product-name">{detalle.producto}</td>
                      <td className="quantity">{detalle.cantidad}</td>
                      <td className="unit-price">{formatPrice(detalle.precioUnitario)}</td>
                      <td className="subtotal">{formatPrice(detalle.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2 total-row">
                <span className="total-label">Total: </span> <span className="total-value">{formatPrice(pedido.precioTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetails;