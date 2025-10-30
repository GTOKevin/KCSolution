import React, { useState } from 'react';
import { Calendar, User, DollarSign, Package, Eye, Edit, Trash2 } from 'lucide-react';
import { usePedidos } from '../../hooks/useApi';
import PedidoDetails from '../PedidoDetails';
import './Lists.css';

const PedidosList: React.FC = () => {
  const { pedidos, loading, error, refetch } = usePedidos();
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleViewDetails = (pedido: Pedido) => {
    setSelectedPedidoId(pedido.id);
  };

  const handleCloseDetails = () => {
    setSelectedPedidoId(null);
  };

  if (loading) {
    return (
      <div className="list-container">
        <div className="list-header">
          <h2 className="list-title">
            <Package className="title-icon" />
            Lista de Pedidos
          </h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando pedidos...</p>
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
            Lista de Pedidos
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
          Lista de Pedidos
        </h2>
        <div className="list-stats">
          <span className="stat-item">
            Total: {pedidos.length} pedidos
          </span>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <div className="empty-state">
          <Package size={64} className="empty-icon" />
          <h3>No hay pedidos registrados</h3>
          <p>Los pedidos que crees aparecerán aquí</p>
        </div>
      ) : (
        <div className="list-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      <span className="id-badge">#{pedido.id}</span>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={16} />
                        {formatDate(pedido.fecha)}
                      </div>
                    </td>
                    <td>
                      <div className="client-cell">
                        <User size={16} />
                        {pedido.clienteNombre} {pedido.clienteApellido}
                      </div>
                    </td>
                    <td>
                      <div className="price-cell">
                        <DollarSign size={16} />
                        {formatPrice(pedido.precioTotal)}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button 
                          className="action-button view"
                          title="Ver detalles"
                          onClick={() => handleViewDetails(pedido)}
                        >
                          <Eye size={16} /> 
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

      {/* Modal de detalles */}
      {selectedPedidoId && (
        <PedidoDetails 
          pedidoId={selectedPedidoId} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
};

export default PedidosList;