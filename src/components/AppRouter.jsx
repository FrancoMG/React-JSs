import React, { useContext } from 'react';
import { NavContext } from '../context/NavContext';
import Inicio from '../pages/Inicio';
import Productos from '../pages/Productos';
import ProductoDetalle from '../pages/ProductoDetalle';
import Carrito from '../pages/Carrito';
import Login from '../pages/Login';
import Admin from '../pages/Admin';

function AppRouter() {
  const { currentPage } = useContext(NavContext);

  switch(currentPage) {
    case 'inicio':
      return <Inicio />;
    case 'productos':
      return <Productos />;
    case 'detalle':
      return <ProductoDetalle />;
    case 'carrito':
      return <Carrito />;
    case 'login':
      return <Login />;
    case 'admin':
      return <Admin />;
    default:
      return <Inicio />;
  }
}

export default AppRouter;