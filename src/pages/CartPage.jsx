import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon, ProductImg } from '../components/ui/Icons';
import { fmt } from '../components/ProductCard';

const WA_NUMBER = '573189750285'; // +57 318 9750285 sin espacios ni +

function buildWhatsAppUrl(cart, total) {
  const lines = cart.map(i => `• ${i.name} (${i.brand} ${i.size}) x${i.qty} → ${fmt(i.price * i.qty)}`).join('\n');
  const msg = `¡Hola! 👋 Me interesa cotizar los siguientes productos de Osocas Ferrecolor:\n\n${lines}\n\n*Total estimado: ${fmt(total)}*\n\n¿Me pueden confirmar disponibilidad y precios?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();

  const update = (id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  };

  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

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
      {/* Header */}
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

          {/* Líneas de productos */}
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: '#555' }}>
              <span style={{ flex: 1, paddingRight: 8 }}>{item.name} ×{item.qty}</span>
              <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(item.price * item.qty)}</span>
            </div>
          ))}

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '2px solid #eee', marginTop: 8, marginBottom: 24 }}>
            <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 22 }}>Total</span>
            <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 26, color: '#CC0000' }}>{fmt(total)}</span>
          </div>

          {/* Botón WhatsApp */}
          <a
            href={buildWhatsAppUrl(cart, total)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', background: '#25D366', color: '#fff', border: 'none',
              cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800,
              fontSize: 20, padding: '16px', borderRadius: 6, textTransform: 'uppercase',
              letterSpacing: 0.5, marginBottom: 12, textDecoration: 'none',
              boxSizing: 'border-box', transition: 'background .2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1ebe5d'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Consultar por WhatsApp
          </a>

          {/* Botón cotización formal */}
          <button
            onClick={() => navigate('/quote')}
            style={{ width: '100%', background: 'transparent', border: '2px solid #CC0000', cursor: 'pointer', color: '#CC0000', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '12px', borderRadius: 6, textTransform: 'uppercase' }}
          >
            Solicitar Cotización Formal
          </button>
        </div>
      </div>
    </div>
  );
}
