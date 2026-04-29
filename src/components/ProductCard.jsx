import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductImg } from './ui/Icons';

export const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);
  const [hov, setHov] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: `2px solid ${hov ? '#CC0000' : '#eee'}`, transition: 'all .2s', boxShadow: hov ? '0 8px 32px rgba(204,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)', transform: hov ? 'translateY(-4px)' : 'none', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', background: '#f8f8f8', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '28px 0', color: 'inherit' }}>
        <ProductImg type={product.image} size={120} />
      </Link>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#CC0000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: '#fff0f0', padding: '2px 8px', borderRadius: 3 }}>{product.brand}</span>
          <span style={{ fontSize: 12, color: '#999', background: '#f5f5f5', padding: '2px 8px', borderRadius: 3 }}>{product.size}</span>
        </div>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20, color: '#111', lineHeight: 1.2, marginBottom: 8, marginTop: 8 }}>{product.name}</h3>
        </Link>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 16, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: 28, fontWeight: 900, color: '#CC0000' }}>{fmt(product.price)}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', background: '#f5f5f5', color: '#555', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 14, padding: '8px 12px', borderRadius: 4 }}>Ver más</Link>
            <button onClick={handleAdd} style={{ background: added ? '#22aa44' : '#CC0000', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 14, padding: '8px 14px', borderRadius: 4, transition: 'background .3s' }}>
              {added ? '✓' : '+'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MiniProductCard({ product }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: '#262626', borderRadius: 8, overflow: 'hidden', border: `1px solid ${hov ? '#CC0000' : '#333'}`, transition: 'border-color .2s, transform .2s', transform: hov ? 'translateY(-3px)' : 'none', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/product/${product.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#222', padding: 16, textDecoration: 'none' }}>
        <ProductImg type={product.image} size={90} />
      </Link>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: 10, color: '#CC0000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{product.brand}</div>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 17, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>{product.name}</div>
        </Link>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>{product.size}</div>
        <div style={{ fontFamily: 'Barlow Condensed', fontSize: 22, fontWeight: 900, color: '#CC0000', marginTop: 'auto' }}>{fmt(product.price)}</div>
      </div>
    </div>
  );
}
