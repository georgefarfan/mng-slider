import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href="/exercise1">Exercise 1</Link>
        </li>
        <li>
          <Link href="/exercise2">Exercise 2</Link>
        </li>
      </ul>
    </section>
  );
}
