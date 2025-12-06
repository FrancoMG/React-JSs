import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado de usuario
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persistencia de sesión
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  // LOGIN MEJORADO: Busca por Email O por Nombre
  const login = (identifier, password) => {
    // 1. Admin hardcodeado
    if (identifier === 'admin' && password === '1234') {
      setUser({ role: 'admin', nombre: 'Administrador', email: 'admin' });
      return { success: true };
    }

    // 2. Buscar en usuarios registrados
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Validamos si el identificador coincide con el email O con el nombre
    const foundUser = users.find(u => 
      (u.email === identifier || u.nombre === identifier) && u.password === password
    );

    if (foundUser) {
      setUser({ ...foundUser, role: 'user' });
      return { success: true };
    }

    return { success: false, message: 'Usuario o contraseña incorrectos' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  // NUEVA FUNCIÓN: Crear Orden y guardarla en localStorage
  const crearOrden = (carrito, total) => {
    if (!user) return;

    const nuevaOrden = {
      id: Date.now(), // ID único basado en fecha
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total: total,
      estado: 'completado',
      userId: user.email // Asociamos la orden al usuario actual
    };

    const ordenes = JSON.parse(localStorage.getItem('orders') || '[]');
    ordenes.push(nuevaOrden);
    localStorage.setItem('orders', JSON.stringify(ordenes));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      register,
      crearOrden 
    }}>
      {children}
    </AuthContext.Provider>
  );
}