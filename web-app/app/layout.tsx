import "@styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header>
          <h1>MNG App test</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
