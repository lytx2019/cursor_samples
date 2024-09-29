"use client";

import React, { useState, useCallback, useRef } from 'react';
import styles from './index.module.css';

const numRows = 30;
const numCols = 50;

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]
];

const generateEmptyGrid = (): number[][] => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generateExampleGrid = (): number[][] => {
  const grid = generateEmptyGrid();
  // Example pattern: Glider
  grid[1][2] = 1;
  grid[2][3] = 1;
  grid[3][1] = 1;
  grid[3][2] = 1;
  grid[3][3] = 1;
  return grid;
};

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(g => {
      return g.map((row, i) =>
        row.map((col, k) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
              neighbors += g[newI][newK];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            return 0;
          } else if (g[i][k] === 0 && neighbors === 3) {
            return 1;
          } else {
            return g[i][k];
          }
        })
      );
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <button onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setGrid(generateExampleGrid())}>
        Generate Example
      </button>
      <div className={styles.grid}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = [...grid];
                newGrid[i][k] = grid[i][k] ? 0 : 1;
                setGrid(newGrid);
              }}
              className={styles.cell}
              style={{
                backgroundColor: grid[i][k] ? 'blue' : 'black',
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default GameOfLife;