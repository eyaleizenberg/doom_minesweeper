import {handleActions} from 'redux-actions';
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

export const getCellsData = state => state.data;

export default handleActions({
  [ACTIONS.GAME_OVER]: state => {
    return {...state, isGameOver: true};
  },
  [ACTIONS.TOGGLE_NEW_GAME_DIALOG]: state => {
    return {...state, loadDialogShown: false, saveDialogShown: false, newGameDialogShown: !state.newGameDialogShown};
  },
  [ACTIONS.MATRIX_CREATED]: state => {
    return {...defaultState, gameInProgress: true};
  },
  [ACTIONS.SHOW_CUSTOM_GAME_DIALOG]: state => {
    return {...state, customGameDialogShown: true, newGameDialogShown: false};
  },
  [ACTIONS.GAME_WON]: state => {
    return {...state, isGameWon: true};
  },
  [ACTIONS.TIMER_TICK]: state => {
    return {...state, timer: state.timer + 1};
  },
  [ACTIONS.SAVE_DIALOG_TOGGLED]: state => {
    return {...state, newGameDialogShown: false, loadDialogShown: false, saveDialogShown: !state.saveDialogShown};
  },
  [ACTIONS.LOAD_DIALOG_TOGGLED]: state => {
    return {...state, newGameDialogShown: false, saveDialogShown: false, loadDialogShown: !state.loadDialogShown};
  }
}, defaultState);
