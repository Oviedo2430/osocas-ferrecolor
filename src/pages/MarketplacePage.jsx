import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { pb } from '../lib/pocketbase';

export default function MarketplacePage({ cat, addToCart }) {
  const isFerreos = cat === 'ferreos';
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [brand, setBrand] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const records = await pb.collection('products').getFullList({
          filter: `category.slug = "${cat}"`,
          sort: '-created',
          expand: 'category'
        });
        const mapped = records.map(r => ({
          id: r.id,
          cat: r.expand?.category?.name || (isFerreos ? 'Férreos' : 'Pinturas'),
          name: r.name,
          brand: r.brand,
          size: r.size,
          price: r.price,
          desc: r.description,
          specs: r.specs ? JSON.parse(r.specs) : [],
          image: (r.expand?.category?.name || '').toLowerCase().includes('pintura') ? 'pintura' : 'ferreo',
          imageUrl: r.images && r.images.length > 0 ? pb.files.getUrl(r, r.images[0]) : null
        }));
        setProducts(mapped);
      } catch (err) {
        console.warn('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [cat]);

  const brands = ['all', ...new Set(products.map(p => p.brand))];

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );
  if (brand !== 'all') filtered = filtered.filter(p => p.brand === brand);
  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ background: '#303030', padding: '48px 24px 40px', borderBottom: '4px solid #CC0000' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Link to="/" style={{ textDecoration: 'none', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontFamily: 'Barlow', fontSize: 14 }}>Inicio</Link>
            <span style={{ color: '#444' }}>/</span>
            <span style={{ color: '#CC0000', fontFamily: 'Barlow', fontSize: 14, fontWeight: 600 }}>{isFerreos ? 'Férreos y Derivados' : 'Pinturas y Derivados'}</span>
          </div>
          <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>
            {isFerreos ? <><span style={{ color: '#CC0000' }}>Productos</span> Férreos</> : <>Pinturas y <span style={{ color: '#CC0000' }}>Derivados</span></>}
          </h1>
          <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>{products.length} productos disponibles — Mejores precios garantizados</p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar producto o marca..."
            style={{ flex: 1, minWidth: 200, padding: '10px 16px', border: '2px solid #ddd', borderRadius: 6, fontFamily: 'Barlow', fontSize: 15, outline: 'none', transition: 'border-color .2s' }}
            onFocus={e => e.target.style.borderColor = '#CC0000'} onBlur={e => e.target.style.borderColor = '#ddd'}
          />
          <select value={brand} onChange={e => setBrand(e.target.value)}
            style={{ padding: '10px 14px', border: '2px solid #ddd', borderRadius: 6, fontFamily: 'Barlow', fontSize: 15, background: '#fff', cursor: 'pointer' }}>
            <option value="all">Todas las marcas</option>
            {brands.slice(1).map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding: '10px 14px', border: '2px solid #ddd', borderRadius: 6, fontFamily: 'Barlow', fontSize: 15, background: '#fff', cursor: 'pointer' }}>
            <option value="default">Ordenar por</option>
            <option value="low">Precio: menor a mayor</option>
            <option value="high">Precio: mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#888' }}>
            <p style={{ fontSize: 20, fontFamily: 'Barlow Condensed', fontWeight: 700 }}>Cargando productos...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#888' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 20, fontFamily: 'Barlow Condensed', fontWeight: 700 }}>No se encontraron productos</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 28 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
