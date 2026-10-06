import { API_BASE_URL } from "../../lib/api";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  anio_publicacion: number;
  disponible: boolean;
};

export default async function DetalleLibro({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE_URL}/api/libros/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Libro no encontrado");
    }

    const libro: Libro = await res.json();

    return (
      <main>
        <h1>{libro.titulo}</h1>

        <p>Autor: {libro.autor}</p>
        <p>Año de publicación: {libro.anio_publicacion}</p>
        <p>Disponible: {libro.disponible ? "Sí" : "No"}</p>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <h1>Libro no encontrado</h1>
        <p>No se pudo encontrar el libro solicitado.</p>
      </main>
    );
  }
}
