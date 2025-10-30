import React, { useState } from 'react';
import { ShoppingCart, Package, Users, FileText } from 'lucide-react';
import PedidoForm from '../Forms/PedidoForm';
import PedidosList from '../Lists/PedidosList';
import ClientesList from '../Lists/ClientesList';
import ProductosList from '../Lists/ProductosList';
import './Layout.css';

type ActiveTab = 'nuevo-pedido' | 'pedidos' | 'clientes' | 'productos';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('nuevo-pedido');

  const renderContent = () => {
    switch (activeTab) {
      case 'nuevo-pedido':
        return <PedidoForm />;
      case 'pedidos':
        return <PedidosList />;
      case 'clientes':
        return <ClientesList />;
      case 'productos':
        return <ProductosList />;
      default:
        return <PedidoForm />;
    }
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className="layout-header">
        <div className="header-content">
          <div className="header-brand">
            <ShoppingCart className="brand-icon" />
            <h1 className="brand-title">KCSolution</h1>
            <span className="brand-subtitle">Sistema de Gestión de Pedidos</span>
          </div>
          
          <div className="header-info">
            <span className="company-name">Organic EIRL</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="layout-nav">
        <div className="nav-content">
          <div className="nav-items">
            <button 
              className={`nav-item ${activeTab === 'nuevo-pedido' ? 'active' : ''}`}
              onClick={() => setActiveTab('nuevo-pedido')}
            >
              <FileText size={20} />
              <span>Nuevo Pedido</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'pedidos' ? 'active' : ''}`}
              onClick={() => setActiveTab('pedidos')}
            >
              <ShoppingCart size={20} />
              <span>Pedidos</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="layout-main">
        <div className="main-content">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="footer-content">
          <p>&copy; 2024 KCSolution - Sistema de Gestión de Pedidos</p>
          <p>Desarrollado para Organic EIRL</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;