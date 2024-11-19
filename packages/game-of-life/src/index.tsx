"use client";

import React, { useState, useCallback, useRef } from 'react';
import styles from './index.module.css';

const numRows = 30;
const numCols = 50;

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]
];

const patterns = {
  glider: (grid: number[][]) => {
    grid[1][2] = 1;
    grid[2][3] = 1;
    grid[3][1] = 1;
    grid[3][2] = 1;
    grid[3][3] = 1;
    return grid;
  },
  blinker: (grid: number[][]) => {
    grid[15][25] = 1;
    grid[15][26] = 1;
    grid[15][27] = 1;
    return grid;
  },
  block: (grid: number[][]) => {
    grid[10][10] = 1;
    grid[10][11] = 1;
    grid[11][10] = 1;
    grid[11][11] = 1;
    return grid;
  },
  beacon: (grid: number[][]) => {
    // First block
    grid[5][5] = 1;
    grid[5][6] = 1;
    grid[6][5] = 1;
    grid[6][6] = 1;
    // Second block
    grid[7][7] = 1;
    grid[7][8] = 1;
    grid[8][7] = 1;
    grid[8][8] = 1;
    return grid;
  },
  pulsar: (grid: number[][]) => {
    // Top
    grid[2][4] = grid[2][5] = grid[2][6] = grid[2][10] = grid[2][11] = grid[2][12] = 1;
    // Bottom
    grid[14][4] = grid[14][5] = grid[14][6] = grid[14][10] = grid[14][11] = grid[14][12] = 1;
    // Left
    grid[4][2] = grid[5][2] = grid[6][2] = grid[10][2] = grid[11][2] = grid[12][2] = 1;
    // Right
    grid[4][14] = grid[5][14] = grid[6][14] = grid[10][14] = grid[11][14] = grid[12][14] = 1;
    // Inner top
    grid[7][4] = grid[7][5] = grid[7][6] = grid[7][10] = grid[7][11] = grid[7][12] = 1;
    // Inner bottom
    grid[9][4] = grid[9][5] = grid[9][6] = grid[9][10] = grid[9][11] = grid[9][12] = 1;
    // Inner left
    grid[4][7] = grid[5][7] = grid[6][7] = grid[10][7] = grid[11][7] = grid[12][7] = 1;
    // Inner right
    grid[4][9] = grid[5][9] = grid[6][9] = grid[10][9] = grid[11][9] = grid[12][9] = 1;
    return grid;
  }
};

const generateEmptyGrid = (): number[][] => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generatePatternGrid = (pattern: keyof typeof patterns): number[][] => {
  const grid = generateEmptyGrid();
  return patterns[pattern](grid);
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
      <div style={{ margin: '10px 0' }}>
        <button onClick={() => setGrid(generatePatternGrid('glider'))}>Glider</button>
        <button onClick={() => setGrid(generatePatternGrid('blinker'))}>Blinker</button>
        <button onClick={() => setGrid(generatePatternGrid('block'))}>Block</button>
        <button onClick={() => setGrid(generatePatternGrid('beacon'))}>Beacon</button>
        <button onClick={() => setGrid(generatePatternGrid('pulsar'))}>Pulsar</button>
        <button onClick={() => setGrid(generateEmptyGrid())}>Clear</button>
      </div>
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