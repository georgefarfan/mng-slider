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
          <h3>MNG App test</h3>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
