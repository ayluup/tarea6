import Link from "next/link";
import { API_BASE_URL } from "../lib/api";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean;
};

export default async function Libros() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/libros`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error al obtener los libros");
    }

    const libros: Libro[] = await res.json();

    return (
      <main>
        <h1>Biblioteca</h1>

        {libros.map((libro) => (
          <div key={libro.id}>
            <h2>
              <Link href={`/libros/${libro.id}`}>{libro.titulo}</Link>
            </h2>

            <p>Autor: {libro.autor}</p>

            {!libro.disponible && <p>(No disponible)</p>}
          </div>
        ))}
      </main>
    );
  } catch (error) {
    return (
      <main>
        <h1>Biblioteca</h1>

        <p>No se pudieron cargar los libros. Intentá nuevamente más tarde.</p>
      </main>
    );
  }
}
