import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: 40, fontFamily: 'system-ui', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>Laure Olivié — Créateur LinkedIn</h1>
      <p style={{ color: '#666', fontSize: 18 }}>Plateforme de création de contenu pour LinkedIn.</p>
      <Link
        href="/outil"
        style={{
          display: 'inline-block',
          marginTop: 20,
          padding: '12px 24px',
          backgroundColor: '#7c3aed',
          color: 'white',
          textDecoration: 'none',
          borderRadius: 8,
        }}
      >
        Accéder à l&apos;outil
      </Link>
      <p style={{ marginTop: 30, fontSize: 14, color: '#888' }}>
        <a href="/test.html">→ Page de test (HTML statique)</a>
      </p>
    </div>
  );
}
