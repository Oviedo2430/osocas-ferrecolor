import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartIcon, HamburgerIcon } from './ui/Icons';

export default function Navbar({ cart }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const total = cart.reduce((s, i) => s + i.qty, 0);

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/ferreos', label: 'Férreos' },
    { path: '/pinturas', label: 'Pinturas' },
    { path: '/quote', label: 'Cotizar' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#3a3a3a', borderBottom: '3px solid #CC0000', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0, overflow: 'visible', padding: 0 }}>
          <img src="/uploads/Logo_SF.png" alt="Osocas Ferrecolor" style={{ height: 52, width: 'auto', display: 'block', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.18)) drop-shadow(0 2px 6px rgba(0,0,0,0.7))', transition: 'filter .3s' }} onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 16px rgba(204,0,0,0.55)) drop-shadow(0 0 6px rgba(255,255,255,0.2))'} onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(255,255,255,0.18)) drop-shadow(0 2px 6px rgba(0,0,0,0.7))'} />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} style={{ textDecoration: 'none', color: isActive(path) ? '#CC0000' : '#ccc', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, letterSpacing: 0.5, padding: '6px 14px', borderBottom: isActive(path) ? '2px solid #CC0000' : '2px solid transparent', transition: 'all .2s' }}>
              {label}
            </Link>
          ))}
          <Link to="/cart" style={{ textDecoration: 'none', position: 'relative', background: isActive('/cart') ? '#CC0000' : '#222', color: '#fff', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, padding: '8px 18px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, transition: 'all .2s' }}>
            <CartIcon /> Carrito
            {total > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: '#CC0000', color: '#fff', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{total}</span>}
          </Link>
        </nav>

        {/* Mobile nav */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} className="mobile-nav">
          <Link to="/cart" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', textDecoration: 'none' }}>
            <CartIcon size={24} />
            {total > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#CC0000', color: '#fff', width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>{total}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div style={{ background: '#1a1a1a', borderTop: '1px solid #333', padding: '12px 0' }} className="mobile-nav">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} onClick={() => setOpen(false)} style={{ display: 'block', textDecoration: 'none', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: isActive(path) ? '#CC0000' : '#ccc', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18, padding: '12px 24px', textAlign: 'left' }}>
              {label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setOpen(false)} style={{ display: 'block', textDecoration: 'none', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: isActive('/cart') ? '#CC0000' : '#ccc', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18, padding: '12px 24px', textAlign: 'left' }}>
            Carrito
          </Link>
        </div>
      )}
    </header>
  );
}
