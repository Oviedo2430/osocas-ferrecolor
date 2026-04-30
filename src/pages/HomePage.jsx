import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GearSVG, FerreosIcon, PinturasIcon } from '../components/ui/Icons';
import { MiniProductCard } from '../components/ProductCard';
import { pb } from '../lib/pocketbase';

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch some products from PocketBase to show on home page
    const fetchFeatured = async () => {
      try {
        const [records, categories] = await Promise.all([
          pb.collection('products').getList(1, 8),
          pb.collection('categories').getFullList()
        ]);
        
        const catMap = {};
        categories.forEach(c => catMap[c.id] = c);

        const products = records.items.map(r => {
          const catObj = catMap[r.category];
          return {
            id: r.id,
            cat: catObj ? catObj.name : 'Férreos',
            name: r.name,
            brand: r.brand,
            size: r.size,
            price: r.price,
            desc: r.description,
            specs: (() => { try { return r.specs ? JSON.parse(r.specs) : []; } catch(e) { return []; } })(),
            image: (catObj ? catObj.name : '').toLowerCase().includes('pintura') ? 'pintura' : 'ferreo',
            imageUrl: r.images && r.images.length > 0 ? pb.files.getUrl(r, r.images[0]) : null
          };
        });
        setFeaturedProducts(products);
      } catch (err) {
        console.warn('Could not fetch products, using empty array for now. Make sure the "products" collection exists and has public read access.', err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', background: 'linear-gradient(160deg,#3a3a3a 0%,#252525 100%)', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.06 }}>
          <GearSVG style={{ position: 'absolute', right: -80, top: -80, width: 500, height: 500, color: '#fff' }} />
          <GearSVG style={{ position: 'absolute', left: -120, bottom: -100, width: 400, height: 400, color: '#fff' }} />
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: 'linear-gradient(to bottom, #CC0000, #660000)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
          <div className="fadeUp">
            <img src="/uploads/Logo_SF.png" alt="Osocas Ferrecolor" style={{ height: 'clamp(60px,10vw,100px)', width: 'auto', display: 'block', margin: '0 auto 24px', filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.15)) drop-shadow(0 4px 16px rgba(0,0,0,0.6))' }} />
          </div>
          <p className="fadeUp2" style={{ fontFamily: 'Barlow Condensed', fontStyle: 'italic', fontSize: 22, color: '#CC0000', marginBottom: 16, letterSpacing: 1 }}>Del hierro al color, todo en uno</p>
          <h1 className="fadeUp2" style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(42px,8vw,88px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 20, textTransform: 'uppercase', letterSpacing: -1 }}>
            Tu ferretería <span style={{ color: '#CC0000' }}>de confianza</span>
          </h1>
          <p className="fadeUp3" style={{ fontSize: 18, color: '#aaa', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Los precios más competitivos del mercado. La mejor relación calidad/precio en materiales férreos, pinturas y derivados para tus proyectos.
          </p>
          <div className="fadeUp3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ferreos" style={{ textDecoration: 'none', background: '#CC0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '16px 36px', letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4, transition: 'all .2s' }}
              onMouseEnter={e => e.target.style.background = '#ff2222'} onMouseLeave={e => e.target.style.background = '#CC0000'}>
              Ver Productos Férreos
            </Link>
            <Link to="/pinturas" style={{ textDecoration: 'none', background: 'transparent', color: '#fff', border: '2px solid #fff', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '16px 36px', letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4, transition: 'all .2s' }}
              onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#111'; }} onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}>
              Ver Pinturas
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#CC0000', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24, textAlign: 'center' }}>
          {[['20+', 'Años de experiencia'], ['500+', 'Productos disponibles'], ['#1', 'Relación calidad/precio'], ['Cúcuta', 'Norte de Santander']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 48, fontWeight: 900, textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' }}>Nuestras <span style={{ color: '#CC0000' }}>Categorías</span></h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 52, fontSize: 18 }}>Todo lo que necesitas para tu proyecto, en un solo lugar</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>
            <CategoryCard
              title="Productos Férreos y Derivados"
              desc="Varillas, láminas, tornillos, tuberías, mallas, alambres y todo el acero que tu construcción necesita."
              color="#111"
              accent="#CC0000"
              icon={<FerreosIcon />}
              onClick={() => navigate('/ferreos')}
            />
            <CategoryCard
              title="Pinturas y Derivados"
              desc="Esmaltes, pinturas de caucho, anticorrosivos, impermeabilizantes, thinners y más marcas líderes."
              color="#CC0000"
              accent="#fff"
              icon={<PinturasIcon />}
              onClick={() => navigate('/pinturas')}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 48, fontWeight: 900, textAlign: 'center', marginBottom: 52, textTransform: 'uppercase' }}>¿Por qué <span style={{ color: '#CC0000' }}>elegirnos?</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32 }}>
            {[
              ['🏆', 'Mejor precio', 'Precios imbatibles en el mercado, sin sacrificar calidad.'],
              ['✅', 'Calidad garantizada', 'Trabajamos con las mejores marcas nacionales e internacionales.'],
              ['⚙️', 'Durabilidad', 'Productos de alta resistencia para proyectos que duran.'],
              ['🤝', 'Tu aliado', 'Te asesoramos en cada proyecto, desde el inicio hasta el final.'],
            ].map(([ic, t, d]) => (
              <div key={t} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 8, border: '1px solid #eee', transition: 'box-shadow .2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(204,0,0,0.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{ic}</div>
                <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 24, fontWeight: 800, marginBottom: 8, textTransform: 'uppercase' }}>{t}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section style={{ padding: '80px 24px', background: '#2c2c2c' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 48, fontWeight: 900, textAlign: 'center', marginBottom: 8, textTransform: 'uppercase', color: '#fff' }}>Productos <span style={{ color: '#CC0000' }}>destacados</span></h2>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: 52, fontSize: 18 }}>Nuestra selección más solicitada</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 24 }}>
              {featuredProducts.map(p => (
                <MiniProductCard key={p.id} product={p} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/ferreos" style={{ textDecoration: 'none', background: '#CC0000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '14px 32px', letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Ver Férreos</Link>
              <Link to="/pinturas" style={{ textDecoration: 'none', background: 'transparent', color: '#fff', border: '2px solid #555', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '14px 32px', letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Ver Pinturas</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Cotizar */}
      <section style={{ padding: '80px 24px', background: '#CC0000' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: 52, fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: 16 }}>¿Necesitas una cotización?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginBottom: 36, lineHeight: 1.6 }}>Déjanos tus datos y te enviamos una propuesta personalizada con los mejores precios del mercado.</p>
          <Link to="/quote" style={{ textDecoration: 'none', background: '#fff', color: '#CC0000', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 20, padding: '18px 48px', letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Cotizar Ahora</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2a2a2a', padding: '60px 24px 32px', borderTop: '3px solid #CC0000' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 40 }}>
          <div>
            <img src="/uploads/Logo_SF.png" alt="Osocas Ferrecolor" style={{ height: 50, width: 'auto', display: 'block', marginBottom: 16, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.12))' }} />
            <p style={{ color: '#777', lineHeight: 1.7, fontSize: 14 }}>Del hierro al color, todo en uno. Tu ferretería de confianza en Cúcuta, Norte de Santander.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Barlow Condensed', color: '#CC0000', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>Categorías</h4>
            {['Productos Férreos', 'Pinturas y Esmaltes', 'Impermeabilizantes', 'Anticorrosivos', 'Herramientas'].map(c => (
              <p key={c} style={{ color: '#777', fontSize: 14, marginBottom: 8, cursor: 'pointer' }}>{c}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Barlow Condensed', color: '#CC0000', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>Contacto</h4>
            {[['📱', '3189750285'], ['✉️', 'osocasferrecolor@gmail.com'], ['📍', 'Cúcuta, Norte de Santander']].map(([ic, t]) => (
              <p key={t} style={{ color: '#777', fontSize: 14, marginBottom: 10 }}><span style={{ marginRight: 8 }}>{ic}</span>{t}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'Barlow Condensed', color: '#CC0000', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>Redes Sociales</h4>
            {[['TikTok', 'osocasferrecolor'], ['Instagram', 'osocasferrecolor'], ['Facebook', 'osocasferrecolor']].map(([r, h]) => (
              <p key={r} style={{ color: '#777', fontSize: 14, marginBottom: 10 }}><strong style={{ color: '#aaa' }}>{r}</strong> @{h}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #222', marginTop: 48, paddingTop: 24, textAlign: 'center', color: '#444', fontSize: 13 }}>
          © 2026 Osocas Ferrecolor — Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}

function CategoryCard({ title, desc, color, accent, icon, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: color, borderRadius: 12, padding: '48px 40px', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s', transform: hov ? 'translateY(-4px)' : 'none', boxShadow: hov ? '0 16px 48px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }}>
        <GearSVG style={{ width: 180, height: 180, color: accent === '#fff' ? '#fff' : '#fff' }} />
      </div>
      <div style={{ marginBottom: 20, color: accent }}>{icon}</div>
      <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 32, fontWeight: 900, color: accent, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 12 }}>{title}</h3>
      <p style={{ color: accent === '#fff' ? 'rgba(255,255,255,0.75)' : '#888', lineHeight: 1.6, marginBottom: 20 }}>{desc}</p>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, color: accent === '#fff' ? '#fff' : '#CC0000', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Explorar catálogo →
      </span>
    </div>
  );
}
