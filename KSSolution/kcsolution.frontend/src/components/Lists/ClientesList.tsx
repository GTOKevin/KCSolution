import React from 'react';
import { Users, User, CreditCard, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useClientes } from '../../hooks/useApi';
import './Lists.css';

const ClientesList: React.FC = () => {
  const { clientes, loading, error, refetch } = useClientes();

  if (loading) {
    return (
      <div className="list-container">
        <div className="list-header">
          <h2 className="list-title">
            <Users className="title-icon" />
            Lista de Clientes
          </h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando clientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-container">
        <div className="list-header">
          <h2 className="list-title">
            <Users className="title-icon" />
            Lista de Clientes
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
          <Users className="title-icon" />
          Lista de Clientes
        </h2>
        <div className="list-actions">
          <button className="add-button">
            <Plus size={16} />
            Nuevo Cliente
          </button>
        </div>
        <div className="list-stats">
          <span className="stat-item">
            Total: {clientes.length} clientes
          </span>
        </div>
      </div>

      {clientes.length === 0 ? (
        <div className="empty-state">
          <Users size={64} className="empty-icon" />
          <h3>No hay clientes registrados</h3>
          <p>Los clientes que registres aparecerán aquí</p>
          <button className="add-button">
            <Plus size={16} />
            Agregar primer cliente
          </button>
        </div>
      ) : (
        <div className="list-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>DNI</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>
                      <span className="id-badge">#{cliente.id}</span>
                    </td>
                    <td>
                      <div className="client-cell">
                        <User size={16} />
                        <div className="client-info">
                          <span className="client-name">
                            {cliente.nombre} {cliente.apellido}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="dni-cell">
                        <CreditCard size={16} />
                        {cliente.dni}
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

export default ClientesList;