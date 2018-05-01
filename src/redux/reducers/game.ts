import { handleActions } from 'redux-actions';
import { IGameState } from '../../interfaces/gameInterface';
import * as ACTIONS from '../../constants/actionTypes';

export const defaultState = {
  isGameOver: false,
  gameInProgress: false,
  newGameDialogShown: false,
  customGameDialogShown: false,
  isGameWon: false,
  saveDialogShown: false,
  loadDialogShown: false,
  timer: 0
};

export const getTimer = (state: IGameState): number => state.timer;

export const getIsGameOver = (state: IGameState): boolean => state.isGameOver;

export const getIsGameWon = (state: IGameState): boolean => state.isGameWon;

export const getNewGameDialogShown = (state: IGameState): boolean =>
  state.newGameDialogShown;

export const getGameInProgress = (state: IGameState): boolean =>
  state.gameInProgress;

export const getCustomGameDialogShown = (state: IGameState): boolean =>
  state.customGameDialogShown;

export const getSaveDialogShown = (state: IGameState): boolean =>
  state.saveDialogShown;

export const getLoadDialogShown = (state: IGameState): boolean =>
  state.loadDialogShown;

export default handleActions(
  {
    [ACTIONS.GAME_OVER]: (state: IGameState) => {
      return { ...state, isGameOver: true };
    },
    [ACTIONS.TOGGLE_NEW_GAME_DIALOG]: (state: IGameState) => {
      return {
        ...state,
        loadDialogShown: false,
        saveDialogShown: false,
        newGameDialogShown: !state.newGameDialogShown
      };
    },
    [ACTIONS.MATRIX_CREATED]: (state: IGameState) => {
      return { ...defaultState, gameInProgress: true };
    },
    [ACTIONS.SHOW_CUSTOM_GAME_DIALOG]: (state: IGameState) => {
      return {
        ...state,
        customGameDialogShown: true,
        newGameDialogShown: false
      };
    },
    [ACTIONS.GAME_WON]: (state: IGameState) => {
      return { ...state, isGameWon: true };
    },
    [ACTIONS.TIMER_TICK]: (state: IGameState) => {
      return { ...state, timer: state.timer + 1 };
    },
    [ACTIONS.SAVE_DIALOG_TOGGLED]: (state: IGameState) => {
      return {
        ...state,
        newGameDialogShown: false,
        loadDialogShown: false,
        saveDialogShown: !state.saveDialogShown
      };
    },
    [ACTIONS.LOAD_DIALOG_TOGGLED]: (state: IGameState) => {
      return {
        ...state,
        newGameDialogShown: false,
        saveDialogShown: false,
        loadDialogShown: !state.loadDialogShown
      };
    }
  },
  defaultState
);
