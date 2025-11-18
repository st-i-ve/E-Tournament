export interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Relationship {
  parent: string;
  child: string;
}

export interface TournamentNode {
  id: string;
  label: string;
  level: number;
  color: string;
}