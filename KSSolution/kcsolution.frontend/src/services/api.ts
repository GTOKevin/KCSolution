import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';


interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// Configuración base de la API
const API_BASE_URL = 'https://localhost:5001/api';

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error);
    
    // Formatear error para la aplicación
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Error desconocido',
      errors: error.response?.data?.errors || {},
      statusCode: error.response?.status || 500,
    };
    
    return Promise.reject(apiError);
  }
);

// ===== SERVICIOS DE CLIENTES =====
export const clientesService = {
  // Obtener todos los clientes
  getAll: async (): Promise<Cliente[]> => {
    const response = await apiClient.get<Cliente[]>('/clientes');
    console.log(response);
    return response.data;
  },

  // Obtener cliente por ID
  getById: async (id: number): Promise<Cliente> => {
    const response = await apiClient.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },
};

// ===== SERVICIOS DE PRODUCTOS =====
export const productosService = {
  // Obtener todos los productos
  getAll: async (): Promise<Producto[]> => {
    const response = await apiClient.get<Producto[]>('/productos');
    return response.data;
  },

  // Obtener producto por ID
  getById: async (id: number): Promise<Producto> => {
    const response = await apiClient.get<Producto>(`/productos/${id}`);
    return response.data;
  },
};

// ===== SERVICIOS DE PEDIDOS =====
export const pedidosService = {
  // Obtener todos los pedidos
  getAll: async (): Promise<Pedido[]> => {
    const response = await apiClient.get<Pedido[]>('/pedidos');
    return response.data;
  },

  // Obtener pedido por ID
  getById: async (id: number): Promise<Pedido> => {
    const response = await apiClient.get<Pedido>(`/pedidos/${id}`);
    return response.data;
  },

  // Crear nuevo pedido
  create: async (pedido: CreatePedidoDto): Promise<Pedido> => {
    const response = await apiClient.post<Pedido>('/pedidos', pedido);
    return response.data;
  },

  // Actualizar pedido
  update: async (id: number, pedido: UpdatePedidoDto): Promise<Pedido> => {
    const response = await apiClient.put<Pedido>(`/pedidos/${id}`, pedido);
    return response.data;
  },

  // Eliminar pedido
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/pedidos/${id}`);
  },
};

// ===== SERVICIO PRINCIPAL =====
export const apiService = {
  clientes: clientesService,
  productos: productosService,
  pedidos: pedidosService,
};

// ===== UTILIDADES =====
export const apiUtils = {
  // Verificar si la API está disponible
  healthCheck: async (): Promise<boolean> => {
    try {
      await apiClient.get('/health');
      return true;
    } catch {
      return false;
    }
  },

  // Formatear errores para mostrar al usuario
  formatError: (error: ApiError): string => {
    if (error.errors && Object.keys(error.errors).length > 0) {
      const errorMessages = Object.values(error.errors).flat();
      return errorMessages.join(', ');
    }
    return error.message;
  },
};

export default apiClient;