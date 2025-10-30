import { useState, useEffect } from 'react';
import { apiService, apiUtils, type ApiError } from '../services/api';
import toast from 'react-hot-toast';

// ===== HOOK PARA CLIENTES =====
export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.clientes.getAll();
      setClientes(data);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiUtils.formatError(apiError);
      setError(errorMessage);
      toast.error(`Error al cargar clientes: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return {
    clientes,
    loading,
    error,
    refetch: fetchClientes,
  };
};

// ===== HOOK PARA PRODUCTOS =====
export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.productos.getAll();
      setProductos(data);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiUtils.formatError(apiError);
      setError(errorMessage);
      toast.error(`Error al cargar productos: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    refetch: fetchProductos,
  };
};

// ===== HOOK PARA PEDIDOS =====
export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.pedidos.getAll();
      setPedidos(data);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiUtils.formatError(apiError);
      setError(errorMessage);
      toast.error(`Error al cargar pedidos: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return {
    pedidos,
    loading,
    error,
    refetch: fetchPedidos,
  };
};

// ===== HOOK PARA OBTENER PEDIDO POR ID =====
export const usePedidoById = (id: number | null) => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPedido = async (pedidoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.pedidos.getById(pedidoId);
      setPedido(data);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiUtils.formatError(apiError);
      setError(errorMessage);
      toast.error(`Error al cargar pedido: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPedido(id);
    } else {
      setPedido(null);
      setError(null);
    }
  }, [id]);

  return {
    pedido,
    loading,
    error,
    refetch: id ? () => fetchPedido(id) : () => {},
  };
};

// ===== HOOK PARA CREAR PEDIDOS =====
export const useCreatePedido = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPedido = async (pedidoData: CreatePedidoDto): Promise<Pedido | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const nuevoPedido = await apiService.pedidos.create(pedidoData);
      toast.success('¡Pedido creado exitosamente!');
      return nuevoPedido;
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiUtils.formatError(apiError);
      setError(errorMessage);
      toast.error(`Error al crear pedido: ${errorMessage}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPedido,
    loading,
    error,
  };
};

// ===== HOOK PARA VERIFICAR CONEXIÓN CON API =====
export const useApiHealth = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const checkConnection = async () => {
    setChecking(true);
    try {
      const isHealthy = await apiUtils.healthCheck();
      setIsConnected(isHealthy);
      if (!isHealthy) {
        toast.error('No se puede conectar con el servidor');
      }
    } catch {
      setIsConnected(false);
      toast.error('Error de conexión con el servidor');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return {
    isConnected,
    checking,
    checkConnection,
  };
};