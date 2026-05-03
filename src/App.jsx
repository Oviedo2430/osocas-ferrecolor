import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import QuotePage from './pages/QuotePage';

const WA_URL = 'https://wa.me/573189750285?text=' + encodeURIComponent('¡Hola! 👋 Me gustaría recibir información sobre los productos de Osocas Ferrecolor.');

function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);    opacity: .7; }
          70%  { transform: scale(1.55); opacity: 0;  }
          100% { transform: scale(1.55); opacity: 0;  }
        }
        .wa-fab-pulse { animation: wa-pulse 2s ease-out infinite; }
      `}</style>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          textDecoration: 'none',
        }}
        aria-label="Chatear por WhatsApp"
      >
        {/* Tooltip */}
        <span style={{
          background: '#1a1a1a', color: '#fff', fontSize: 13,
          fontFamily: 'Barlow, sans-serif', fontWeight: 600,
          padding: '6px 14px', borderRadius: 20, whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
          transition: 'opacity .2s, transform .2s',
          pointerEvents: 'none',
        }}>
          ¡Chatea con nosotros!
        </span>

        {/* Pulse ring */}
        <span className="wa-fab-pulse" style={{
          position: 'absolute', right: 0, bottom: 0,
          width: 60, height: 60, borderRadius: '50%',
          background: '#25D366', display: 'block',
        }} />

        {/* Main button */}
        <span style={{
          position: 'relative', width: 60, height: 60, borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.5)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform .2s',
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </span>
      </a>
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ferreos" element={<MarketplacePage cat="ferreos" addToCart={addToCart} />} />
        <Route path="/pinturas" element={<MarketplacePage cat="pinturas" addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/quote" element={<QuotePage cart={cart} />} />
      </Routes>
      <WhatsAppFAB />
    </Router>
  );
}

export default App;
