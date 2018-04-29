import { ICellsState } from './cellInterface';
import { IGameState } from './gameInterface';
import { IFilesState } from './fileInterface';

export interface IState {
  cells: ICellsState;
  game: IGameState;
  files: IFilesState;
}
