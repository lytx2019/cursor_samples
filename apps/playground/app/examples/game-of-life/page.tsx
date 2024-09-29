import dynamic from 'next/dynamic';

const GameOfLife = dynamic(() => import('@lytx2019/game-of-life'), { ssr: false });

export default function GameOfLifeExample() {
  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <GameOfLife />
    </div>
  );
}
