import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard, { fmt } from '../components/ProductCard';
import { ProductImg } from '../components/ui/Icons';
import { pb } from '../lib/pocketbase';

export default function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const r = await pb.collection('products').getOne(id, { expand: 'category' });
        const p = {
          id: r.id,
          cat: r.expand?.category?.name || 'Producto',
          name: r.name,
          brand: r.brand,
          size: r.size,
          price: r.price,
          desc: r.description,
          specs: r.specs ? JSON.parse(r.specs) : [],
          image: (r.expand?.category?.name || '').toLowerCase().includes('pintura') ? 'pintura' : 'ferreo',
          imageUrl: r.images && r.images.length > 0 ? pb.files.getUrl(r, r.images[0]) : null
        };
        setProduct(p);

        // Fetch related
        const relRecords = await pb.collection('products').getList(1, 4, {
          filter: `category = "${r.category}" && id != "${p.id}"`,
          expand: 'category'
        });
        setRelated(relRecords.items.map(rel => ({
          id: rel.id,
          cat: rel.expand?.category?.name || 'Producto',
          name: rel.name,
          brand: rel.brand,
          size: rel.size,
          price: rel.price,
          desc: rel.description,
          specs: rel.specs ? JSON.parse(rel.specs) : [],
          image: (rel.expand?.category?.name || '').toLowerCase().includes('pintura') ? 'pintura' : 'ferreo',
          imageUrl: rel.images && rel.images.length > 0 ? pb.files.getUrl(rel, rel.images[0]) : null
        })));
      } catch (err) {
        console.warn('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Cargando...</div>;
  if (!product) return <div style={{ padding: '80px', textAlign: 'center' }}>Producto no encontrado.</div>;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f5f5f5', borderBottom: '1px solid #e5e5e5', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#888', fontSize: 14, fontFamily: 'Barlow' }}>Inicio</Link>
          <span style={{ color: '#bbb' }}>/</span>
          <Link to={`/${product.cat}`} style={{ textDecoration: 'none', color: '#888', fontSize: 14, fontFamily: 'Barlow' }}>{product.cat === 'ferreos' ? 'Férreos' : 'Pinturas'}</Link>
          <span style={{ color: '#bbb' }}>/</span>
          <span style={{ color: '#111', fontSize: 14, fontFamily: 'Barlow', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64 }}>
          {/* Image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#f8f8f8', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: product.imageUrl ? '0' : '60px 40px', border: '2px solid #eee', overflow: 'hidden' }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: 400 }} />
              ) : (
                <ProductImg type={product.image} size={200} />
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ fontSize: 12, color: '#CC0000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{product.cat === 'ferreos' ? 'Productos Férreos' : 'Pinturas y Derivados'}</span>
            <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: '#111', lineHeight: 1, marginTop: 8, marginBottom: 12 }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
              <span style={{ background: '#f0f0f0', padding: '4px 14px', borderRadius: 4, fontSize: 14, fontWeight: 600, color: '#555' }}>{product.brand}</span>
              <span style={{ background: '#fff0f0', padding: '4px 14px', borderRadius: 4, fontSize: 14, fontWeight: 600, color: '#CC0000' }}>{product.size}</span>
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: 52, fontWeight: 900, color: '#CC0000', marginBottom: 24 }}>{fmt(product.price)}</div>
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: 16, marginBottom: 28 }}>{product.desc}</p>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div style={{ background: '#f8f8f8', borderRadius: 8, padding: '20px', marginBottom: 32 }}>
                <h4 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, marginBottom: 16, textTransform: 'uppercase', color: '#111' }}>Especificaciones</h4>
                {product.specs.map(s => (
                  <div key={s} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: 14 }}>
                    <span style={{ color: '#CC0000', fontWeight: 700 }}>•</span>
                    <span style={{ color: '#444' }}>{s}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: '#f5f5f5', border: 'none', cursor: 'pointer', width: 40, height: 48, fontSize: 20, color: '#333' }}>−</button>
                <span style={{ width: 48, textAlign: 'center', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: '#f5f5f5', border: 'none', cursor: 'pointer', width: 40, height: 48, fontSize: 20, color: '#333' }}>+</button>
              </div>
              <button onClick={handleAdd} style={{ flex: 1, minWidth: 200, background: added ? '#22aa44' : '#CC0000', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20, padding: '14px 28px', borderRadius: 6, letterSpacing: 0.5, textTransform: 'uppercase', transition: 'background .3s' }}>
                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>
            </div>
            <button onClick={() => navigate('/quote')} style={{ width: '100%', marginTop: 12, background: 'transparent', border: '2px solid #CC0000', cursor: 'pointer', color: '#CC0000', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 18, padding: '12px 28px', borderRadius: 6, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Solicitar cotización
            </button>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 36, fontWeight: 900, marginBottom: 32, textTransform: 'uppercase' }}>Productos <span style={{ color: '#CC0000' }}>relacionados</span></h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 24 }}>
              {related.map(p => (
                <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
