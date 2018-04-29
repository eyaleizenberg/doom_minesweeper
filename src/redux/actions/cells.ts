import { Dispatch } from 'redux';
import { IState } from '../../interfaces/state';
import { createAction } from 'redux-actions';
import * as ACTIONS from '../../constants/actionTypes';
import { getCellsData, getTotalDemons } from '../reducers/cells';
import { ICellMap } from '../../interfaces/cellInterface';

const matrixCreatedAction = createAction(ACTIONS.MATRIX_CREATED);
const gameOverAction = createAction(ACTIONS.GAME_OVER);
const gameWonAction = createAction(ACTIONS.GAME_WON);
const exposeCellAction = createAction(ACTIONS.CELL_EXPOSED);
const exposeEmptyCellAction = createAction(ACTIONS.EMPTY_CELL_EXPOSED);
const toggleCellFlagAction = createAction(ACTIONS.CELL_FLAG_TOGGLED);
const timerTickAction = createAction(ACTIONS.TIMER_TICK);

let timer: any = null;

export const initMatrix = (opts: {
  width: number;
  height: number;
  totalDemons: number;
}) => (dispatch: Dispatch<IState>) => {
  const parsedData = Object.keys(opts).reduce((res, key) => {
    return { ...res, [key]: parseInt(opts[key]) };
  }, {});

  dispatch(matrixCreatedAction(parsedData));
  clearInterval(timer);
  timer = setInterval(() => dispatch(timerTickAction()), 1000);
};

export const toggleCellFlag = (cellId: string) => (
  dispatch: Dispatch<IState>
) => {
  dispatch(toggleCellFlagAction({ cellId }));
};

export const _countUnExposedCells = (data: ICellMap): number => {
  let count = 0;
  Object.keys(data).forEach(key => {
    if (!data[key].isExposed) {
      count++;
    }
  });

  return count;
};

// change the any to an interface
export const _dispatchGameWonIfNeeded = (
  dispatch: Dispatch<IState>,
  getState: () => any
): void => {
  const cellsState = getState().cells;
  const data = getCellsData(cellsState);
  const totalDemons = getTotalDemons(cellsState);

  if (_countUnExposedCells(data) === totalDemons) {
    dispatch(gameWonAction());
    clearInterval(timer);
  }
};

export const revealCell = (cellId: string) => (
  dispatch: Dispatch<IState>,
  getState: () => IState
) => {
  const cell = getCellsData(getState().cells)[cellId];
  if (cell.isDemon) {
    dispatch(gameOverAction({ cellId }));
    clearInterval(timer);
  } else if (cell.adjacentDemons > 0) {
    dispatch(exposeCellAction({ cellId }));
    _dispatchGameWonIfNeeded(dispatch, getState);
  } else {
    dispatch(exposeEmptyCellAction({ cellId }));
    _dispatchGameWonIfNeeded(dispatch, getState);
  }
};
