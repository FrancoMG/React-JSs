import React from 'react';
import { NavProvider } from './context/NavContext';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import { ProductsProvider } from './context/ProductsContext';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './components/AppRouter';
import './styles/styles.css';

function App() {
  return (
    <HelmetProvider>
      <NavProvider>
        <AuthProvider>
          <ProductsProvider>
            <CarritoProvider>
              <div className="app">
                <Navbar />
                <main className="main">
                  <AppRouter />
                </main>
                <Footer />
                <ToastContainer 
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </CarritoProvider>
          </ProductsProvider>
        </AuthProvider>
      </NavProvider>
    </HelmetProvider>
  );
}

export default App;