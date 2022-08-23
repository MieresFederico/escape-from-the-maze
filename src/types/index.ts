export interface Maze {
  board: string[][];
  start: Coordinate;
  end: Coordinate;
}

export interface Player {
  position: Coordinate;
}

export interface Coordinate {
  x: number;
  y: number;
}
