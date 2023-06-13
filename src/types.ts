export type Player = "X" | "O";

export interface IBoard {
  [x: number]: Player | null;
}
