import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';

export default function QuotePage({ cart }) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', city: '', products: '', notes: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (cart.length > 0) {
      set('products', cart.map(i => `${i.name} (${i.size}) x${i.qty}`).join('\n'));
    }
  }, [cart]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Assuming a pocketbase collection named 'quotes'
      await pb.collection('quotes').create({
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        city: form.city,
        products: form.products,
        notes: form.notes,
        status: 'pending'
      });
      setSent(true);
    } catch (err) {
      console.warn("Could not save quote to PocketBase", err);
      // Fallback for demo
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center', background: '#f5f5f5' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '60px 48px', maxWidth: 500, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ width: 80, height: 80, background: '#22aa44', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36, color: '#fff' }}>✓</div>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 40, fontWeight: 900, marginBottom: 12 }}>¡Cotización enviada!</h2>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>Hemos recibido tu solicitud. Un asesor se comunicará contigo pronto al número <strong>{form.phone}</strong> o al correo <strong>{form.email}</strong>.</p>
          <button onClick={() => setSent(false)} style={{ background: '#CC0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '14px 32px', borderRadius: 6, textTransform: 'uppercase' }}>Nueva Cotización</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div style={{ background: '#111', padding: '40px 24px', borderBottom: '4px solid #CC0000' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 52, fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
            Solicitar <span style={{ color: '#CC0000' }}>Cotización</span>
          </h1>
          <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>Completa el formulario y te contactamos con los mejores precios</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <form onSubmit={submit} style={{ background: '#fff', borderRadius: 12, padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            <Field label="Nombre completo *" value={form.name} onChange={v => set('name', v)} required placeholder="Tu nombre" />
            <Field label="Empresa (opcional)" value={form.company} onChange={v => set('company', v)} placeholder="Nombre de la empresa" />
            <Field label="Teléfono / WhatsApp *" value={form.phone} onChange={v => set('phone', v)} required placeholder="Ej: 3001234567" />
            <Field label="Correo electrónico *" value={form.email} onChange={v => set('email', v)} required type="email" placeholder="correo@ejemplo.com" />
            <Field label="Ciudad" value={form.city} onChange={v => set('city', v)} placeholder="Tu ciudad" />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5, color: '#333' }}>Productos requeridos *</label>
            <textarea
              value={form.products} onChange={e => set('products', e.target.value)} required
              rows={5} placeholder="Ejemplo: Varilla corrugada 1/2&quot; x 6m — 20 unidades&#10;Pintura blanca 1 galón — 10 unidades"
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: 6, fontFamily: 'Barlow', fontSize: 15, resize: 'vertical', outline: 'none', transition: 'border-color .2s', lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = '#CC0000'} onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5, color: '#333' }}>Notas adicionales</label>
            <textarea
              value={form.notes} onChange={e => set('notes', e.target.value)}
              rows={3} placeholder="Plazos, forma de entrega, otras especificaciones..."
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: 6, fontFamily: 'Barlow', fontSize: 15, resize: 'vertical', outline: 'none', transition: 'border-color .2s', lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = '#CC0000'} onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>
          <button type="submit" disabled={loading} style={{ background: '#CC0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 22, padding: '18px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Enviando...' : 'Enviar Cotización →'}
          </button>
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: 13 }}>También puedes contactarnos directamente al <strong style={{ color: '#333' }}>3189750285</strong> o escribir a <strong style={{ color: '#333' }}>osocasferrecolor@gmail.com</strong></p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required, type = 'text', placeholder }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5, color: '#333' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder}
        style={{ width: '100%', padding: '10px 16px', border: '2px solid #ddd', borderRadius: 6, fontFamily: 'Barlow', fontSize: 15, outline: 'none', transition: 'border-color .2s' }}
        onFocus={e => e.target.style.borderColor = '#CC0000'} onBlur={e => e.target.style.borderColor = '#ddd'}
      />
    </div>
  );
}
