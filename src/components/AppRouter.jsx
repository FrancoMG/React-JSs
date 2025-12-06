import React, { useContext } from 'react';
import { NavContext } from '../context/NavContext';
import Inicio from '../pages/Inicio';
import Productos from '../pages/Productos';
import ProductoDetalle from '../pages/ProductoDetalle';
import Carrito from '../pages/Carrito';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import HistorialPedidos from '../pages/HistorialPedidos';
import Admin from '../pages/Admin';
import AdminProductos from '../pages/AdminProductos';
import AdminUsuarios from '../pages/AdminUsuarios';

function AppRouter() {
  const { currentPage } = useContext(NavContext);

  switch(currentPage) {
    case 'inicio': return <Inicio />;
    case 'productos': return <Productos />;
    case 'detalle': return <ProductoDetalle />;
    case 'carrito': return <Carrito />;
    case 'login': return <Login />;
    case 'registro': return <Registro />;
    case 'mis-pedidos': return <HistorialPedidos />;
    
    // Rutas de Admin
    case 'admin': return <Admin />;
    case 'admin-productos': return <AdminProductos />;
    case 'admin-usuarios': return <AdminUsuarios />;
    
    default: return <Inicio />;
  }
}

export default AppRouter;