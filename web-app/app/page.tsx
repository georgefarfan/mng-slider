import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <ul className="list">
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
