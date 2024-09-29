import Link from 'next/link';

const examples = [
  { name: "Conway's Game of Life", path: "/examples/game-of-life" },
  // 可以在此处添加更多示例
];

export default function Examples() {
  return (
    <div>
      <h1>Examples</h1>
      <ul>
        {examples.map((example) => (
          <li key={example.path}>
            <Link href={example.path}>{example.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}