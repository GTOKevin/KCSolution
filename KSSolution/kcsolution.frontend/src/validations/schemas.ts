import * as yup from 'yup';

// ===== ESQUEMA PARA DETALLE DE PEDIDO =====
export const detallePedidoSchema = yup.object({
  productoId: yup
    .number()
    .nullable()
    .required('Debe seleccionar un producto')
    .min(1, 'Debe seleccionar un producto válido'),
  
  cantidad: yup
    .number()
    .required('La cantidad es requerida')
    .min(1, 'La cantidad debe ser mayor a 0')
    .max(1000, 'La cantidad no puede ser mayor a 1000')
    .integer('La cantidad debe ser un número entero'),
  
  precioUnitario: yup
    .number()
    .required('El precio unitario es requerido')
    .min(0.01, 'El precio debe ser mayor a 0'),
  
  subtotal: yup
    .number()
    .required('El subtotal es requerido')
    .min(0, 'El subtotal no puede ser negativo'),
});

// ===== ESQUEMA PARA PEDIDO =====
export const pedidoSchema = yup.object({
  clienteId: yup
    .number()
    .nullable()
    .required('Debe seleccionar un cliente')
    .min(1, 'Debe seleccionar un cliente válido'),
  
  fecha: yup
    .string()
    .required('La fecha es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD'),
  
  detalles: yup
    .array()
    .of(detallePedidoSchema)
    .required('Debe agregar al menos un producto')
    .min(1, 'Debe agregar al menos un producto')
    .max(50, 'No puede agregar más de 50 productos'),
  
  precioTotal: yup
    .number()
    .required('El precio total es requerido')
    .min(0, 'El precio total no puede ser negativo'),
});

// ===== ESQUEMA PARA CLIENTE =====
export const clienteSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(120, 'El nombre no puede tener más de 120 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  
  apellido: yup
    .string()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(120, 'El apellido no puede tener más de 120 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),
  
  dni: yup
    .string()
    .required('El DNI es requerido')
    .min(8, 'El DNI debe tener al menos 8 caracteres')
    .max(15, 'El DNI no puede tener más de 15 caracteres')
    .matches(/^[0-9]+$/, 'El DNI solo puede contener números'),
});

// ===== ESQUEMA PARA PRODUCTO =====
export const productoSchema = yup.object({
  descripcion: yup
    .string()
    .required('La descripción es requerida')
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(200, 'La descripción no puede tener más de 200 caracteres'),
  
  precioUnitario: yup
    .number()
    .required('El precio unitario es requerido')
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio no puede ser mayor a 999,999.99'),
});

// ===== MENSAJES DE ERROR PERSONALIZADOS =====
export const validationMessages = {
  required: 'Este campo es requerido',
  email: 'Debe ser un email válido',
  min: (min: number) => `Debe tener al menos ${min} caracteres`,
  max: (max: number) => `No puede tener más de ${max} caracteres`,
  number: 'Debe ser un número válido',
  positive: 'Debe ser un número positivo',
  integer: 'Debe ser un número entero',
  minValue: (min: number) => `Debe ser mayor o igual a ${min}`,
  maxValue: (max: number) => `Debe ser menor o igual a ${max}`,
};

// ===== UTILIDADES DE VALIDACIÓN =====
export const validationUtils = {
  // Validar DNI peruano
  validateDNI: (dni: string): boolean => {
    return /^[0-9]{8}$/.test(dni);
  },
  
  // Validar precio
  validatePrice: (price: number): boolean => {
    return price > 0 && price <= 999999.99;
  },
  
  // Validar cantidad
  validateQuantity: (quantity: number): boolean => {
    return Number.isInteger(quantity) && quantity > 0 && quantity <= 1000;
  },
  
  // Formatear errores de validación
  formatValidationErrors: (errors: Record<string, any>): Record<string, string> => {
    const formattedErrors: Record<string, string> = {};
    
    Object.keys(errors).forEach(key => {
      if (errors[key]?.message) {
        formattedErrors[key] = errors[key].message;
      } else if (typeof errors[key] === 'string') {
        formattedErrors[key] = errors[key];
      }
    });
    
    return formattedErrors;
  },
};