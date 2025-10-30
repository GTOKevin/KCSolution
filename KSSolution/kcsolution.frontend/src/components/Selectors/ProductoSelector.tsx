import React from 'react';
import Select from 'react-select';
import { Package } from 'lucide-react';
import styles from './ProductoSelector.module.css';

interface ProductoSelectorProps {
  productos: Producto[];
  value: number | null;
  onChange: (productoId: number | null) => void;
  error?: string;
  loading?: boolean;
  placeholder?: string;
  excludeIds?: number[]; // Para excluir productos ya seleccionados
}

const ProductoSelector: React.FC<ProductoSelectorProps> = ({
  productos,
  value,
  onChange,
  error,
  loading = false,
  placeholder = "Seleccionar producto...",
  excludeIds = []
}) => {
  // Filtrar productos excluidos y convertir a opciones para react-select
  const options: ProductoOption[] = productos
    .filter(producto => !excludeIds.includes(producto.id))
    .map(producto => ({
      value: producto.id,
      label: producto.descripcion,
    }));

  // Encontrar la opción seleccionada
  const selectedOption = options.find(option => option.value === value) || null;

  // Manejar cambio de selección
  const handleChange = (selectedOption: ProductoOption | null) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Estilos personalizados para react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error ? '#ef4444' : state.isFocused ? '#667eea' : '#d1d5db',
      boxShadow: state.isFocused 
        ? error 
          ? '0 0 0 1px #ef4444' 
          : '0 0 0 1px #667eea'
        : 'none',
      '&:hover': {
        borderColor: error ? '#ef4444' : '#667eea',
      },
      minHeight: '42px',
      fontSize: '14px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#667eea' 
        : state.isFocused 
          ? '#f1f5f9' 
          : 'white',
      color: state.isSelected ? 'white' : '#374151',
      padding: '12px 16px',
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
      fontSize: '14px',
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: '#667eea',
    }),
  };

  // Formato personalizado para mostrar las opciones
  const formatOptionLabel = (option: ProductoOption) => (
    <div className="producto-option">
      <div className="producto-option-main">
        <Package size={16} className="producto-option-icon" />
        <span className="producto-option-name">{option.label}</span>
      </div>
    </div>
  );

  return (
    <div className={styles['producto-selector']}>
      <label className={styles['selector-label']}>
        <Package size={16} className={styles['selector-icon']} />
        Producto
      </label>
      
      <Select<ProductoOption>
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isLoading={loading}
        isSearchable
        isClearable
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        noOptionsMessage={() => "No se encontraron productos"}
        loadingMessage={() => "Cargando productos..."}
        className={`${styles['react-select-container']} ${error ? styles['has-error'] : ''}`}
        classNamePrefix="react-select"
      />
      
      {error && (
        <div className={styles['selector-error']}>
          {error}
        </div>
      )}

    </div>
  );
};

export default ProductoSelector;