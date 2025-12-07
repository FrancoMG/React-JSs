import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error al recuperar carrito:", error);
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {

    if (!producto || !producto.id) return;

    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Aseguramos que el precio sea un número
      setCarrito([...carrito, { 
        ...producto, 
        cantidad: 1, 
        price: parseFloat(producto.price) || 0 
      }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 3. Cálculo TOTAL SEGURO
  const totalCarrito = carrito.reduce((total, item) => {
    const precio = parseFloat(item.price) || 0;
    const cantidad = parseInt(item.cantidad) || 1;
    return total + (precio * cantidad);
  }, 0);

  return (
    <CarritoContext.Provider value={{ 
      carrito, 
      agregarAlCarrito, 
      eliminarDelCarrito, 
      vaciarCarrito, 
      totalCarrito 
    }}>
      {children}
    </CarritoContext.Provider>
  );
}