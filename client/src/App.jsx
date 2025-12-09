import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContexts';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './pages/Products';
import SellJewelry from './pages/SellJewelry';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import MyQuotations from './pages/MyQuotations';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Footer />
              </>
            } />

            <Route path="/productos" element={
              <>
                <Products />
                <Footer />
              </>
            } />

            <Route path="/vender-oro" element={
              <>
                <SellJewelry />
                <Footer />
              </>
            } />

            <Route path="/login" element={
              <>
                <Login />
                <Footer />
              </>
            } />

            <Route path="/registro" element={
              <>
                <Register />
                <Footer />
              </>
            } />

            <Route path="/mis-cotizaciones" element={
              <ProtectedRoute>
                <>
                  <MyQuotations />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <>
                  <Admin />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
