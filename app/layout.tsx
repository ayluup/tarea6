import type { Metadata } from "next";
import { RegistroServiceWorker } from "./RegistroServiceWorker";

export const metadata: Metadata = {
  title: "Biblioteca App",
  description: "Mi aplicación de Biblioteca PWA",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f9fafb' }}>
        <RegistroServiceWorker />
        {children}
      </body>
    </html>
  );
}