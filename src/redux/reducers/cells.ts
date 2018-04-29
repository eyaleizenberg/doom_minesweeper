import { handleActions } from 'redux-actions';
import * as ACTIONS from '../../constants/actionTypes';
import { genXy, genSurrounding } from '../../utilities/genXy';
import { ICell, ICellMap } from '../../interfaces/cellInterface';
import { Dispatch } from 'redux';
import { ICellsState } from '../../interfaces/cellInterface';

const MAX_KNOWN_DEMON_TYPES = 12;

export const defaultState = {
  sortedData: [],
  data: {},
  width: null,
  height: null,
  totalDemons: null
};

const getRandomNumber = (max: number): number =>
  Math.floor(Math.random() * 1000 + 1) % max;

const conjureDemons = (
  data: ICellMap,
  totalDemons: number,
  width: number,
  height: number
): ICellMap => {
  let demonsConjured = 0;
  const tempData = { ...data };

  while (demonsConjured < totalDemons) {
    const x = getRandomNumber(width);
    const y = getRandomNumber(height);
    const id = genXy(x, y);

    if (!tempData[id].isDemon) {
      tempData[id] = {
        ...data[id],
        isDemon: true,
        demonId: getRandomNumber(MAX_KNOWN_DEMON_TYPES)
      };
      demonsConjured++;
    }
  }

  return tempData;
};

const generateMatrix = (
  width: number,
  height: number
): { data: ICellMap; sortedData: string[][] } => {
  const data = {};
  const sortedData: string[][] = [];

  for (let x = 0; x < width; x++) {
    sortedData[x] = [];
    for (let y = 0; y < height; y++) {
      const id = genXy(x, y);
      data[id] = {
        id,
        isDemon: false,
        isExposed: false,
        isKiller: false,
        isFlagged: false,
        x,
        y
      };

      sortedData[x].push(id);
    }
  }

  return {
    data,
    sortedData
  };
};

const countDemonInCell = (dataWithDemons: ICellMap, id: string): number => {
  const adjacentCell = dataWithDemons[id];
  if (adjacentCell) {
    return adjacentCell.isDemon ? 1 : 0;
  }

  return 0;
};

const setNumbers = (
  dataWithDemons: ICellMap,
  width: number,
  height: number
): ICellMap => {
  const dataWithNumbers = { ...dataWithDemons };

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let count = 0;

      genSurrounding(x, y).forEach(coordinates => {
        count += countDemonInCell(dataWithDemons, coordinates);
      });
      dataWithNumbers[genXy(x, y)].adjacentDemons = count;
    }
  }

  return dataWithNumbers;
};

const markAllVisible = (data: ICellMap, cellId?: string): ICellMap => {
  const tempData = { ...data };
  Object.keys(tempData).forEach(currentCell => {
    const newCellData = { isExposed: true, isKiller: false };

    if (cellId && cellId === currentCell) {
      newCellData.isKiller = true;
    }

    tempData[currentCell] = { ...tempData[currentCell], ...newCellData };
  });

  return tempData;
};

export const getCellsData = state => state.data;
export const getTotalDemons = state => state.totalDemons;

const traverseFromEmpty = (data: ICellMap, initialCell: ICell): void => {
  const adjacentCoordinates = genSurrounding(initialCell.x, initialCell.y);
  adjacentCoordinates.forEach(coordinate => {
    const cell = data[coordinate];
    if (cell && !cell.isExposed && !cell.isDemon && !cell.isFlagged) {
      data[coordinate].isExposed = true;
      if (!cell.adjacentDemons) {
        traverseFromEmpty(data, data[coordinate]);
      }
    }
  });
};

interface IPayload {
  width: number;
  height: number;
  totalDemons: number;
  cellId: string;
}

export default handleActions(
  {
    [ACTIONS.MATRIX_CREATED]: (
      state: ICellsState,
      { payload }: { payload: IPayload }
    ) => {
      const { width, height, totalDemons } = payload;
      const { sortedData, data } = generateMatrix(width, height);
      const dataWithDemons = conjureDemons(data, totalDemons, width, height);
      const dataWithNumbers = setNumbers(dataWithDemons, width, height);
      return {
        ...state,
        sortedData,
        data: dataWithNumbers,
        width,
        height,
        totalDemons
      };
    },
    [ACTIONS.GAME_OVER]: (
      state: ICellsState,
      { payload }: { payload: IPayload }
    ) => {
      const data = markAllVisible(getCellsData(state), payload.cellId);
      return { ...state, data };
    },
    [ACTIONS.CELL_EXPOSED]: (
      state: ICellsState,
      { payload }: { payload: IPayload }
    ) => {
      const { cellId } = payload;
      const data = { ...state.data };
      data[cellId] = { ...data[cellId], isExposed: true };
      return { ...state, data };
    },
    [ACTIONS.EMPTY_CELL_EXPOSED]: (
      state: ICellsState,
      { payload }: { payload: IPayload }
    ) => {
      const { cellId } = payload;
      const data = JSON.parse(JSON.stringify(state.data));
      data[cellId] = { ...data[cellId], isExposed: true };
      traverseFromEmpty(data, data[cellId]);
      return { ...state, data };
    },
    [ACTIONS.CELL_FLAG_TOGGLED]: (
      state: ICellsState,
      { payload }: { payload: IPayload }
    ) => {
      const { cellId } = payload;
      const data = { ...state.data };
      const cell = data[cellId];
      data[cellId] = { ...data[cellId], isFlagged: !cell.isFlagged };
      return { ...state, data };
    },
    [ACTIONS.GAME_WON]: (state: ICellsState) => {
      const data = markAllVisible(getCellsData(state));
      return { ...state, data };
    }
  },
  defaultState
);
