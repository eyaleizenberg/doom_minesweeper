export interface ICellsState {
  sortedData: string[][];
  data: ICellMap;
  width: number;
  height: number;
  totalDemons: number;
}

export interface ICell {
  id: string;
  isDemon: boolean;
  demonId?: number;
  isExposed: boolean;
  x: number;
  y: number;
  adjacentDemons: number;
  isKiller: boolean;
  isFlagged: boolean;
}

export interface ICellMap {
  [cellId: string]: ICell;
}

export interface ICellContainerProps extends ICell {
  revealCell: (id: string) => void;
  toggleCellFlag: (id: string) => void;
  isGameWon: boolean;
  isGameOver: boolean;
}
