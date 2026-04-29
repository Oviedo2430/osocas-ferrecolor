import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon, ProductImg } from '../components/ui/Icons';
import { fmt } from '../components/ProductCard';

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();
  
  const update = (id, delta) => {
    setCart(prev => {
      const next = prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0);
      return next;
    });
  };
  
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));
  
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <CartIcon size={80} />
        <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 42, fontWeight: 900, marginTop: 24, marginBottom: 12 }}>Tu carrito está vacío</h2>
        <p style={{ color: '#888', fontSize: 18, marginBottom: 32 }}>Agrega productos para comenzar tu compra</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/ferreos" style={{ textDecoration: 'none', background: '#CC0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '14px 32px', borderRadius: 4, textTransform: 'uppercase' }}>Ver Férreos</Link>
          <Link to="/pinturas" style={{ textDecoration: 'none', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '14px 32px', borderRadius: 4, textTransform: 'uppercase' }}>Ver Pinturas</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div style={{ background: '#111', padding: '40px 24px', borderBottom: '4px solid #CC0000' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 52, fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
            Carrito de <span style={{ color: '#CC0000' }}>compras</span>
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32, alignItems: 'start' }}>
        {/* Items */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: 10, padding: '20px', display: 'flex', gap: 20, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexWrap: 'wrap' }}>
                <div style={{ background: '#f8f8f8', borderRadius: 8, padding: item.imageUrl ? 0 : 12, flexShrink: 0, width: 70, height: 70, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ProductImg type={item.image} size={70} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ fontSize: 11, color: '#CC0000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{item.brand}</div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20, color: '#111', marginTop: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: '#999' }}>{item.size}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => update(item.id, -1)} style={{ background: '#f0f0f0', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 4, fontSize: 18, fontWeight: 700 }}>−</button>
                  <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20, width: 32, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => update(item.id, 1)} style={{ background: '#f0f0f0', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 4, fontSize: 18, fontWeight: 700 }}>+</button>
                </div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: 24, fontWeight: 900, color: '#CC0000', minWidth: 120, textAlign: 'right' }}>{fmt(item.price * item.qty)}</div>
                <button onClick={() => remove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 20, padding: 4 }}>✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#fff', borderRadius: 10, padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', position: 'sticky', top: 80 }}>
          <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 28, fontWeight: 900, marginBottom: 24, textTransform: 'uppercase', borderBottom: '2px solid #CC0000', paddingBottom: 12 }}>Resumen</h3>
          {[['Subtotal', fmt(subtotal)], ['IVA (19%)', fmt(iva)]].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 15, color: '#555' }}>
              <span>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '2px solid #eee', borderBottom: '2px solid #eee', marginBottom: 24 }}>
            <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 22 }}>Total</span>
            <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 26, color: '#CC0000' }}>{fmt(total)}</span>
          </div>
          <button style={{ width: '100%', background: '#CC0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20, padding: '16px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
            Pagar con Wompi →
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#aaa', marginBottom: 16 }}>Integración Wompi próximamente</p>
          <button onClick={() => navigate('/quote')} style={{ width: '100%', background: 'transparent', border: '2px solid #CC0000', cursor: 'pointer', color: '#CC0000', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '12px', borderRadius: 6, textTransform: 'uppercase' }}>
            Solicitar Cotización
          </button>
        </div>
      </div>
    </div>
  );
}
