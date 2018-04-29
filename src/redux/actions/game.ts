import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { IState } from '../../interfaces/state';
import * as ACTIONS from '../../constants/actionTypes';

export const toggleNewGameAction = createAction(ACTIONS.TOGGLE_NEW_GAME_DIALOG);
export const showCustomGameDialogAction = createAction(
  ACTIONS.SHOW_CUSTOM_GAME_DIALOG
);
export const toggleSaveDialogAction = createAction(ACTIONS.SAVE_DIALOG_TOGGLED);
export const toggleLoadDialogAction = createAction(ACTIONS.LOAD_DIALOG_TOGGLED);

export const toggleNewGame = () => (dispatch: Dispatch<IState>) => {
  dispatch(toggleNewGameAction());
};

export const showCustomGameDialog = () => (dispatch: Dispatch<IState>) => {
  dispatch(showCustomGameDialogAction());
};

export const toggleSaveDialog = () => (dispatch: Dispatch<IState>) => {
  dispatch(toggleSaveDialogAction());
};

export const toggleLoadDialog = () => (dispatch: Dispatch<IState>) => {
  dispatch(toggleLoadDialogAction());
};
