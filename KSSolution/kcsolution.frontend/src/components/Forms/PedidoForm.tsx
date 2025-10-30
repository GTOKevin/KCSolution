import React, { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, Trash2, Save, X, Calculator, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { pedidoSchema } from '../../validations/schemas';
import { useClientes, useProductos, useCreatePedido } from '../../hooks/useApi';
import ClienteSelector from '../Selectors/ClienteSelector';
import ProductoSelector from '../Selectors/ProductoSelector';
import './PedidoForm.css';

const PedidoForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Hooks para datos
  const { clientes, loading: loadingClientes } = useClientes();
  const { productos, loading: loadingProductos } = useProductos();
  const { createPedido } = useCreatePedido();

  // Configuración del formulario
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PedidoFormData>({
    onInvalid: (errors: any) => console.log('Form errors:', errors),
    resolver: yupResolver(pedidoSchema),
    defaultValues: {
      clienteId: null,
      fecha: new Date().toISOString().split('T')[0],
      detalles: [
        {
          productoId: null,
          cantidad: 1,
          precioUnitario: 0,
          subtotal: 0,
        }
      ],
      precioTotal: 0,
    },
  });

  // Manejo de array de detalles
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detalles',
  });

  // Observar cambios en detalles para calcular totales
  const watchedDetalles = watch('detalles');

  // Console.log para monitorear errores
  useEffect(() => {
    console.log('Form errors:', errors);
  }, [errors]);

  // Función para calcular subtotal individual
  const calculateSubtotal = (index: number): number => {
    const detalle = watchedDetalles[index];
    if (!detalle) return 0;
    
    const cantidad = detalle.cantidad || 0;
    const precioUnitario = detalle.precioUnitario || 0;
    
    return cantidad * precioUnitario;
  };

  // Función para calcular el total general
  const calculateTotal = (): number => {
    return watchedDetalles.reduce((total, detalle, index) => {
      const cantidad = detalle?.cantidad || 0;
      const precioUnitario = detalle?.precioUnitario || 0;
      return total + (cantidad * precioUnitario);
    }, 0);
  };

  // Función para actualizar precio unitario cuando se selecciona un producto
  const updatePrecioUnitario = useCallback((index: number, productoId: number) => {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
      setValue(`detalles.${index}.precioUnitario`, producto.precioUnitario);
    }
  }, [productos, setValue]);

  // Función para actualizar subtotal y total
  const updateSubtotalAndTotal = useCallback(() => {
    watchedDetalles.forEach((detalle, index) => {
      const newSubtotal = calculateSubtotal(index);
      setValue(`detalles.${index}.subtotal`, newSubtotal);
    });
    
    const newTotal = calculateTotal();
    setValue('precioTotal', newTotal);
  }, [watchedDetalles, setValue]);

  // Solo actualizar cuando cambian valores específicos, no en cada render
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSubtotalAndTotal();
    }, 100); // Debounce para evitar múltiples actualizaciones

    return () => clearTimeout(timeoutId);
  }, [watchedDetalles.map(d => `${d.cantidad}-${d.precioUnitario}`).join(','), updateSubtotalAndTotal]);

  // Agregar nuevo detalle
  const addDetalle = () => {
    append({
      productoId: null,
      cantidad: 1,
      precioUnitario: 0,
      subtotal: 0,
    });
  };

  // Remover detalle
  const removeDetalle = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error('Debe tener al menos un producto en el pedido');
    }
  };

  // Obtener productos ya seleccionados para excluir
  const getSelectedProductIds = (currentIndex: number): number[] => {
    return watchedDetalles
      .map((detalle, index) => index !== currentIndex ? detalle.productoId : null)
      .filter((id): id is number => id !== null);
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Enviar formulario
  const onSubmit = async (data: PedidoFormData) => {
    try {
      setIsSubmitting(true);

      console.log(data);
      
      // Validar que todos los detalles tengan producto seleccionado
      const detallesValidos = data.detalles.filter(detalle => 
        detalle.productoId && detalle.cantidad > 0
      );
      
      if (detallesValidos.length === 0) {
        toast.error('Debe agregar al menos un producto al pedido');
        return;
      }

      // Preparar datos para envío
      const pedidoData = {
        clienteId: data.clienteId!,
        fecha: data.fecha,
        detalles: detallesValidos.map(detalle => ({
          productoId: detalle.productoId!,
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precioUnitario
        })),
      };

      await createPedido(pedidoData);
      
      toast.success('Pedido creado exitosamente');
      
      // Resetear formulario
      reset({
        clienteId: null,
        fecha: new Date().toISOString().split('T')[0],
        detalles: [
          {
            productoId: null,
            cantidad: 1,
            precioUnitario: 0,
            subtotal: 0,
          }
        ],
        precioTotal: 0,
      });
      
    } catch (error) {
      console.error('Error al crear pedido:', error);
      toast.error('Error al crear el pedido. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pedido-form-container">
      <div className="form-header">
        <h2 className="form-title">Nuevo Pedido</h2>
        <p className="form-subtitle">Complete la información para crear un nuevo pedido</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pedido-form">
        {/* Información del Cliente */}
        <div className="form-section">
          <h3 className="section-title">Información del Cliente</h3>
          
          <div className="form-row">
            <div className="form-group">
              <ClienteSelector
                clientes={clientes}
                value={watch('clienteId')}
                onChange={(clienteId) => setValue('clienteId', clienteId)}
                error={errors.clienteId?.message}
                loading={loadingClientes}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Fecha del Pedido *
              </label>
              <input
                type="date"
                {...register('fecha')}
                className={`form-input ${errors.fecha ? 'error' : ''}`}
              />
              {errors.fecha && (
                <div className="form-error">{errors.fecha.message}</div>
              )}
            </div>
          </div>
        </div>

        {/* Detalles del Pedido */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Productos del Pedido</h3>
            <button
              type="button"
              onClick={addDetalle}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              <Plus size={18} />
              Agregar Producto
            </button>
          </div>

          <div className="detalles-container">
            {fields.map((field, index) => (
              <div key={field.id} className="detalle-item">
                <div className="detalle-header">
                  <span className="detalle-number">Producto #{index + 1}</span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDetalle(index)}
                      className="btn btn-danger btn-sm"
                      disabled={isSubmitting}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="detalle-content">
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <ProductoSelector
                        productos={productos}
                        value={watch(`detalles.${index}.productoId`)}
                        onChange={(productoId) => {
                          setValue(`detalles.${index}.productoId`, productoId);
                          updatePrecioUnitario(index, productoId);
                        }}
                        error={errors.detalles?.[index]?.productoId?.message}
                        loading={loadingProductos}
                        excludeIds={getSelectedProductIds(index)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cantidad *</label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        {...register(`detalles.${index}.cantidad`, { valueAsNumber: true })}
                        className={`form-input ${errors.detalles?.[index]?.cantidad ? 'error' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.detalles?.[index]?.cantidad && (
                        <div className="form-error">
                          {errors.detalles[index]?.cantidad?.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Precio Unit. *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...register(`detalles.${index}.precioUnitario`, { valueAsNumber: true })}
                        className={`form-input ${errors.detalles?.[index]?.precioUnitario ? 'error' : ''}`}
                      />
                      {errors.detalles?.[index]?.precioUnitario && (
                        <span className="error-message">
                          {errors.detalles[index].precioUnitario?.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subtotal</label>
                      <input
                        type="text"
                        value={formatPrice(calculateSubtotal(index))}
                        className="form-input readonly highlight"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total del Pedido */}
        <div className="form-section">
          <div className="total-section">
            <div className="total-row">
              <span className="total-label">
                <Calculator size={20} />
                Total del Pedido:
              </span>
              <span className="total-amount">
                {formatPrice(calculateTotal())}
              </span>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Limpiar
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || loadingClientes || loadingProductos}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save size={18} />
                Crear Pedido
              </>
            )}
          </button>
        </div>

        {/* Errores generales */}
        {Object.keys(errors).length > 0 && (
          <div className="form-errors">
            <AlertCircle size={20} />
            <span>Por favor, corrija los errores en el formulario</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default PedidoForm;