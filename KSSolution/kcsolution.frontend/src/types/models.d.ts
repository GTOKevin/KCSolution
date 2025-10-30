// Definiciones de tipos para KCSolution

declare interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
}

declare interface Producto {
  id: number;
  descripcion: string;
  precioUnitario: number;
}

declare interface DetallePedido {
  id: number;
  pedidoId: number;
  productoId: number;
  producto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

declare interface Pedido {
  id: number;
  fecha: string;
  clienteId: number;
  cliente?: Cliente; // Opcional para compatibilidad
  clienteNombre: string;
  clienteApellido: string;
  precioTotal: number;
  detalles: DetallePedido[];
}

declare interface CreateClienteDto {
  nombre: string;
  apellido: string;
  dni: string;
}

declare interface UpdateClienteDto {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
}

declare interface CreateProductoDto {
  descripcion: string;
  precioUnitario: number;
}

declare interface UpdateProductoDto {
  id: number;
  descripcion: string;
  precioUnitario: number;
}

declare interface CreateDetallePedidoDto {
  productoId: number;
  cantidad: number;
}

declare interface CreatePedidoDto {
  clienteId: number;
  fecha?: string;
  detalles: CreateDetallePedidoDto[];
}

declare interface UpdatePedidoDto {
  id: number;
  clienteId: number;
  fecha?: string;
  precioTotal: number;
  detalles: DetallePedido[];
}

declare interface PedidoFormData {
  clienteId: number | null;
  fecha: string;
  detalles: DetallePedidoFormData[];
  precioTotal: number;
}

declare interface DetallePedidoFormData {
  productoId: number | null;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

declare interface SelectOption {
  value: number;
  label: string;
}

declare interface ClienteOption extends SelectOption {
  value: number;
  label: string;
  dni: string;
}

declare interface ProductoOption extends SelectOption {
  value: number;
  label: string;
}

declare interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

declare interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

declare interface AppState {
  loading: boolean;
  error: string | null;
  clientes: Cliente[];
  productos: Producto[];
  pedidos: Pedido[];
}

declare interface FormState {
  isSubmitting: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
}