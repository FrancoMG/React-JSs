import React, { createContext, useState } from 'react';

export const NavContext = createContext();

export function NavProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigate = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
  };

  return (
    <NavContext.Provider value={{ currentPage, selectedProductId, navigate }}>
      {children}
    </NavContext.Provider>
  );
}