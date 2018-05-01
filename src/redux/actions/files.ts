import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import * as ACTIONS from '../../constants/actionTypes';
// import axios from 'axios';
// import { getGamesRoute } from '../../constants/routes';
import { getOrGenerateUserId } from '../../utilities/localStorage';
import { IState } from '../../interfaces/state';

export const savedFilesReceivedAction = createAction(
  ACTIONS.SAVED_FILES_RECEIVED
);
export const fileSavedAction = createAction(ACTIONS.FILE_SAVED);
export const fileSavedResetAction = createAction(ACTIONS.FILE_SAVED_RESET);
export const gameLoadedAction = createAction(ACTIONS.FILE_LOADED);

export const fetchSaved = () => (dispatch: Dispatch<IState>): void => {
  const userId = getOrGenerateUserId();
  console.log(userId, dispatch);
  // axios.get(getGamesRoute(userId)).then(response => {
  //   dispatch(savedFilesReceivedAction(response.data));
  // });
};

export const saveFile = (opts: { id: string; name: string }) => (
  dispatch: Dispatch<IState>,
  getState: () => IState
): void => {
  const userId = getOrGenerateUserId();
  console.log(userId);
  // const { game, cells } = getState();
  // axios
  //   .post(getGamesRoute(userId), { ...opts, state: { game, cells } })
  //   .then(response => {
  //     dispatch(fileSavedAction(response.data));
  //     setTimeout(() => dispatch(fileSavedResetAction()), 7000);
  //   })
  //   .catch(error => {
  //     console.warn('OH SNAP! Couldn\'t save', error);
  //   });
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
