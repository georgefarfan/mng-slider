import type { Metadata } from "next";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Mi Proyecto Next.js",
  description: "Creado desde cero con TypeScript y appDir.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header>
          <h1>Mi Proyecto Next.js</h1>
        </header>
        <main>
          {" "}
          {children || (
            <section>
              <h2>Bienvenido 👋</h2>
              <p>Esta es tu página de inicio por defecto.</p>
            </section>
          )}
        </main>
      </body>
    </html>
  );
}
