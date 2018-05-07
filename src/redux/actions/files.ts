import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import * as ACTIONS from '../../constants/actionTypes';
import {
  getOrGenerateUserId,
  getSavedGames,
  saveGame
} from '../../utilities/localStorage';
import { IState } from '../../interfaces/state';

export const savedFilesReceivedAction = createAction(
  ACTIONS.SAVED_FILES_RECEIVED
);
export const fileSavedAction = createAction(ACTIONS.FILE_SAVED);
export const fileSavedResetAction = createAction(ACTIONS.FILE_SAVED_RESET);
export const gameLoadedAction = createAction(ACTIONS.FILE_LOADED);

export const fetchSaved = () => (dispatch: Dispatch<IState>): void => {
  const userId = getOrGenerateUserId();
  const games = getSavedGames(userId);
  dispatch(savedFilesReceivedAction(games));
};

export const saveFile = (opts: { id: string; name: string }) => (
  dispatch: Dispatch<IState>,
  getState: () => IState
): void => {
  const userId = getOrGenerateUserId();
  const { game, cells } = getState();
  const savedGames = saveGame({
    userId,
    ...opts,
    state: {
      game,
      cells
    }
  });

  dispatch(fileSavedAction(savedGames));
};

export const loadFile = (id: string) => (
  dispatch: Dispatch<IState>,
  getState: () => IState
): void => {
  const { files } = getState();
  const file = files.savedFiles[id];
  const { game, cells } = file.state;
  const newState = {
    cells,
    files,
    game: { ...game, saveDialogShown: false }
  };
  dispatch(gameLoadedAction(newState));
};
