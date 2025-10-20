import React from 'react';
import { NavProvider } from './context/NavContext';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './components/AppRouter';
import './styles/styles.css';

function App() {
  return (
    <NavProvider>
      <AuthProvider>
        <CarritoProvider>
          <div className="app">
            <Navbar />
            <main className="main">
              <AppRouter />
            </main>
            <Footer />
          </div>
        </CarritoProvider>
      </AuthProvider>
    </NavProvider>
  );
}

export default App;