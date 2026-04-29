import React from 'react';

export function CartIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function HamburgerIcon({ open }) {
  return open ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function GearSVG({ style }) {
  return (
    <svg viewBox="0 0 100 100" style={style} fill="currentColor">
      <path d="M43.2 7.7l-2.7 8.2a34.4 34.4 0 00-8.5 3.5l-8.3-2.6-6.5 6.5 2.6 8.3a34.4 34.4 0 00-3.5 8.5l-8.2 2.7v9.2l8.2 2.7a34.4 34.4 0 003.5 8.5l-2.6 8.3 6.5 6.5 8.3-2.6a34.4 34.4 0 008.5 3.5l2.7 8.2h9.2l2.7-8.2a34.4 34.4 0 008.5-3.5l8.3 2.6 6.5-6.5-2.6-8.3a34.4 34.4 0 003.5-8.5l8.2-2.7v-9.2l-8.2-2.7a34.4 34.4 0 00-3.5-8.5l2.6-8.3-6.5-6.5-8.3 2.6a34.4 34.4 0 00-8.5-3.5l-2.7-8.2h-9.2zm4.6 25.7a16.6 16.6 0 110 33.2 16.6 16.6 0 010-33.2z" />
    </svg>
  );
}

export function FerreosIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="8" y="24" width="40" height="8" rx="2" fill="#CC0000" />
      <rect x="18" y="12" width="8" height="32" rx="2" fill="#CC0000" />
      <rect x="30" y="12" width="8" height="32" rx="2" fill="#CC0000" />
    </svg>
  );
}

export function PinturasIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <ellipse cx="28" cy="34" rx="14" ry="16" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="28" cy="22" rx="14" ry="4" fill="rgba(255,255,255,0.3)" />
      <rect x="14" y="22" width="28" height="12" fill="rgba(255,255,255,0.2)" />
      <path d="M22 22 Q28 12 34 22" fill="rgba(255,255,255,0.3)" />
      <path d="M24 22 Q28 30 32 22" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

export function ProductImg({ type, size = 180 }) {
  const isFerreo = type === 'ferreo';
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <rect width="180" height="180" fill={isFerreo ? '#1a1a1a' : '#f5eaea'} />
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i} x1={i * 20 - 20} y1="0" x2={i * 20 + 160} y2="180" stroke={isFerreo ? '#222' : '#f0d8d8'} strokeWidth="8" />
      ))}
      {isFerreo ? (
        <g>
          <rect x="60" y="70" width="60" height="10" rx="2" fill="#555" />
          <rect x="70" y="55" width="10" height="70" rx="2" fill="#666" />
          <rect x="100" y="55" width="10" height="70" rx="2" fill="#666" />
          <circle cx="90" cy="90" r="28" stroke="#CC0000" strokeWidth="3" fill="none" />
          <text x="90" y="155" textAnchor="middle" fill="#666" fontFamily="Barlow Condensed" fontSize="11" fontWeight="700">PRODUCTO FÉRREO</text>
        </g>
      ) : (
        <g>
          <ellipse cx="90" cy="95" rx="28" ry="35" fill="#ccc" stroke="#aaa" strokeWidth="2" />
          <ellipse cx="90" cy="68" rx="28" ry="8" fill="#ddd" />
          <rect x="62" y="68" width="56" height="27" fill="#ccc" />
          <rect x="65" y="80" width="50" height="14" fill="#CC0000" />
          <path d="M62 68 Q90 50 118 68" fill="#CC0000" />
          <path d="M80 68 Q90 85 100 68" fill="rgba(255,100,100,0.5)" />
          <text x="90" y="155" textAnchor="middle" fill="#CC0000" fontFamily="Barlow Condensed" fontSize="11" fontWeight="700">PINTURA / DERIVADO</text>
        </g>
      )}
    </svg>
  );
}
