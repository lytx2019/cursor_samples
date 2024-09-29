import Head from 'next/head';
import GameOfLife from '@lytx2019/game-of-life';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Conway's Game of Life</title>
      </Head>
      <main>
        {/* <h1>Conway's Game of Life</h1> */}
        <GameOfLife />
      </main>
    </div>
  );
}