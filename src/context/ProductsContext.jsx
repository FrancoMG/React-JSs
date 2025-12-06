import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

const API_URL = 'https://68f4261ab16eb6f46833f3ee.mockapi.io/products';
  // Cargar productos al iniciar
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      setCargando(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });
      
      if (!response.ok) throw new Error('Error al agregar producto');
      
      const productoCreado = await response.json();
      setProductos([...productos, productoCreado]);
      return { success: true, message: 'Producto agregado correctamente' };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, message: 'Error al agregar el producto' };
    }
  };

  const editarProducto = async (id, productoActualizado) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoActualizado),
      });
      
      if (!response.ok) throw new Error('Error al actualizar producto');
      
      const productoEditado = await response.json();
      setProductos(productos.map(p => p.id === id ? productoEditado : p));
      return { success: true, message: 'Producto actualizado correctamente' };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, message: 'Error al actualizar el producto' };
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error al eliminar producto');
      
      setProductos(productos.filter(p => p.id !== id));
      return { success: true, message: 'Producto eliminado correctamente' };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, message: 'Error al eliminar el producto' };
    }
  };

  return (
    <ProductsContext.Provider value={{
      productos,
      cargando,
      error,
      agregarProducto,
      editarProducto,
      eliminarProducto,
      obtenerProductos
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductsProvider');
  }
  return context;
};