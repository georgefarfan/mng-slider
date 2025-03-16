import Link from 'next/link';

export default function HomePage() {
  return (
    <section>
      <h1>Página de Inicio</h1>
      <p>Explora los ejercicios:</p>
      <ul>
        <li>
          <Link href="/exercise1">Ejercicio 1</Link>
        </li>
        <li>
          <Link href="/exercise2">Ejercicio 2</Link>
        </li>
      </ul>
    </section>
  );
}