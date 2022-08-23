import { Maze, Coordinate } from "../types";

export const MAZE = `
XSXXXXXXXXXX
X X   X    X
X   X X X XX
XXXXX   X  X
X     XXXX X
X XXXXX    X
X     X XXXX
XXX X X    X
X   X XXXXXX
XX XX X   XX
X   X   X  E
XXXXXXXXXXXX
`;

export const MAZE2 = `
XXXXXXXXXSXXXXXXXXXXX
X X   X       X     X
X X X X XXX X XXXXX X
X X X X X   X       X
X X X X X XXXXXXXXX X
X   X X X X     X   X
XXX X X XXX XXX X XXX
X   X   X   X   X   X
X XXXXX X XXX XXXXX X
X X   X X X X X X   X
X XXX X X X X X X XXX
X   X       X X   X X
XXX XXXXX XXX XXXXX X
X   X   X   X       X
X XXX XXXXX X XXXXXXX
X X         X       X
X XXXXXXXXXXXXX XXX X 
X   X   X   X X X   X
X X X X X X X X X XXX
X X   X   X X   X   X
XXXXXXXXXXXEXXXXXXXXX
`;

const getBoard = (board: string): string[][] => {
  return board
    .trim()
    .split("\n")
    .map((row) => row.split(""));
};

const getStart = (board: string[][]): Coordinate => {
  const start = board.findIndex((row) => row.includes("S"));
  const startCol = board[start].findIndex((col) => col === "S");
  return { x: startCol, y: start };
};

const getEnd = (board: string[][]): Coordinate => {
  const end = board.findIndex((row) => row.includes("E"));
  const endCol = board[end].findIndex((col) => col === "E");
  return { x: endCol, y: end };
};

export const parseMaze = (mazeString: string): Maze => {
  const board = getBoard(mazeString);
  const start = getStart(board);
  const end = getEnd(board);

  return { board, start, end };
};

const cloneArray: any = (items: any) =>
  items.map((item: any) => (Array.isArray(item) ? cloneArray(item) : item));

export const areEquals = (obj1: any, obj2: any): boolean =>
  obj1 && obj2 && typeof obj1 === "object" && typeof obj2 === "object"
    ? Object.keys(obj1).length === Object.keys(obj2).length &&
      Object.keys(obj1).every((key) => areEquals(obj1[key], obj2[key]))
    : obj1 === obj2;

export const isArrowKey = (key: string): boolean => {
  return (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  );
};

export const getNextPosition = (
  key: string,
  position: Coordinate
): Coordinate => {
  const { x, y } = position;
  switch (key) {
    case "ArrowUp":
      return { x, y: y - 1 };
    case "ArrowDown":
      return { x, y: y + 1 };
    case "ArrowLeft":
      return { x: x - 1, y };
    case "ArrowRight":
      return { x: x + 1, y };
    default:
      return position;
  }
};

export const isValidPosition = (
  board: string[][],
  position: Coordinate
): boolean => {
  const { x, y } = position;
  return (
    y >= 0 &&
    x >= 0 &&
    y < board.length &&
    x < board[y].length &&
    board[y][x] !== "X"
  );
};

export const getWayToEnd = (
  board: string[][],
  start: Coordinate,
  end: Coordinate
): Coordinate[] | null => {
  const weightBoard = getWeightBoard(board, start);
  const solution = getCoordinatesWeightBoard(weightBoard, end);
  if (!areEquals(solution[0], start)) return null
  return solution;
};

const getWeightBoard = (board: string[][], start: Coordinate): string[][] => {
  const weightBoard = cloneArray(board);
  weightBoard[start.y][start.x] = "1";
  const queue: Coordinate[] = [start];
  let cur_val: number, cur: Coordinate;

  while (queue.length) {
    cur = queue.shift() as Coordinate;
    cur_val = parseInt(weightBoard[cur.y][cur.x]);

    getNeighbors(weightBoard, cur.y, cur.x).forEach((neighbor) => {
      if (
        weightBoard[neighbor.y][neighbor.x] === " " ||
        weightBoard[neighbor.y][neighbor.x] === "E"
      ) {
        weightBoard[neighbor.y][neighbor.x] = (cur_val + 1).toString();
        queue.push(neighbor);
      }
    });
  }
  return weightBoard;
};

const getNeighbors = (map: string[][], y: number, x: number): Coordinate[] => {
  const neighbors: Coordinate[] = [];
  if (isValidPosition(map, { y: y - 1, x })) {
    neighbors.push({ y: y - 1, x });
  }
  if (isValidPosition(map, { y: y + 1, x })) {
    neighbors.push({ y: y + 1, x });
  }
  if (isValidPosition(map, { y, x: x - 1 })) {
    neighbors.push({ y, x: x - 1 });
  }
  if (isValidPosition(map, { y, x: x + 1 })) {
    neighbors.push({ y, x: x + 1 });
  }
  return neighbors;
};

export function getCoordinatesWeightBoard(board: string[][], end: Coordinate) {
  const boardCopy = cloneArray(board);
  let cur_step = parseInt(boardCopy[end.y][end.x]);
  const result = [end];

  while (cur_step > 1) {
    getNeighbors(boardCopy, end.y, end.x).forEach((neighbor) => {
      if (boardCopy[neighbor.y][neighbor.x] === (cur_step - 1).toString()) {
        end = neighbor;
        cur_step = parseInt(boardCopy[end.y][end.x]);
        result.unshift(end);
      }
    });
  }
  return result;
}
