import React from 'react';
import Select from 'react-select';
import { Users } from 'lucide-react';
import styles from './ClienteSelector.module.css';

interface ClienteSelectorProps {
  clientes: Cliente[];
  value: number | null;
  onChange: (clienteId: number | null) => void;
  error?: string;
  loading?: boolean;
  placeholder?: string;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({
  clientes,
  value,
  onChange,
  error,
  loading = false,
  placeholder = "Seleccionar cliente..."
}) => {
  // Convertir clientes a opciones para react-select
  const options: ClienteOption[] = clientes.map(cliente => ({
    value: cliente.id,
    label: `${cliente.nombre} ${cliente.apellido}`,
    dni: cliente.dni,
  }));

  // Encontrar la opción seleccionada
  const selectedOption = options.find(option => option.value === value) || null;

  // Manejar cambio de selección
  const handleChange = (selectedOption: ClienteOption | null) => {
    onChange(selectedOption ? selectedOption.value : null);
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
  const formatOptionLabel = (option: ClienteOption) => (
    <div className={styles['cliente-option']}>
      <div className={styles['cliente-option-main']}>
        <Users size={16} className={styles['cliente-option-icon']} />
        <span className={styles['cliente-option-name']}>{option.label}</span>
      </div>
      <div className={styles['cliente-option-dni']}>
        DNI: {option.dni}
      </div>
    </div>
  );

  return (
    <div className={styles['cliente-selector']}>
      <label className={styles['selector-label']}>
        <Users size={16} className={styles['selector-icon']} />
        Cliente
      </label>
      
      <Select<ClienteOption>
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isLoading={loading}
        isSearchable
        isClearable
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        noOptionsMessage={() => "No se encontraron clientes"}
        loadingMessage={() => "Cargando clientes..."}
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

export default ClienteSelector;