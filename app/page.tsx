import { API_BASE_URL } from "./lib/api";

export default async function HomePage() {
  let libros = [];
  let error = null;

  try {
    // En Vercel, esta URL debe apuntar a un backend público y accesible por HTTPS.
    // Si no está configurada, se usa el valor local por defecto.
    const res = await fetch(`${API_BASE_URL}/api/libros`, {
      cache: 'no-store',
    });

    if (res.ok) {
      libros = await res.json();
    } else {
      error = `El servidor respondió con estado: ${res.status}`;
    }
  } catch (err) {
    error = 'No se pudo conectar con el backend. Verificá que la URL pública o local sea correcta.';
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1E3A5F', marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}>
         Biblioteca App
      </h1>
      
      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', marginBottom: '2rem', textAlign: 'center' }}>
           {error} <br/>
          <small>(Si estás en Vercel, recuerda que el backend debe ser una URL pública, no localhost)</small>
        </div>
      )}
      
      {libros.length === 0 && !error && (
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.1rem' }}>
          No hay libros disponibles en este momento.
        </p>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {libros.map((libro: any) => (
          <article key={libro.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E3A5F', fontSize: '1.25rem', fontWeight: '700' }}>
              {libro.titulo}
            </h3>
            
            <p style={{ margin: '0.5rem 0', color: '#4b5563' }}>
              <strong>Autor:</strong> {libro.autor}
            </p>

            <p style={{ margin: '0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
              <strong>Año:</strong> {libro.anio_publicacion}
            </p>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ 
                display: 'inline-block',
                padding: '0.35rem 0.75rem', 
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                backgroundColor: libro.disponible === 1 ? '#d1fae5' : '#fee2e2',
                color: libro.disponible === 1 ? '#065f46' : '#991b1b'
              }}>
                {libro.disponible === 1 ? '✅ Disponible' : '❌ No disponible'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}