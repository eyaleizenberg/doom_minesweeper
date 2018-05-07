import { handleActions } from 'redux-actions';
import * as ACTIONS from '../../constants/actionTypes';
import generateUuid from '../../utilities/generateUuid';
import { IFilesState, IFile } from '../../interfaces/fileInterface';
import { IGame } from '../../interfaces/gameInterface';

const MAX_FILES = 5;

export const defaultState = {
  savedFiles: {},
  fileJustSaved: ''
};

export const getSavedGames = (state: IFilesState): { [key: string]: IFile } =>
  state.savedFiles;

export const getFileJustSaved = (state: IFilesState): string =>
  state.fileJustSaved;

const generateEmpty = (
  existingGamesLength: number
): { [key: string]: IGame } => {
  let emptyGames = {};
  for (let i = 0; i < MAX_FILES - existingGamesLength; i++) {
    const id = generateUuid();
    emptyGames[id] = {
      id,
      name: '',
      hasBeenSaved: false
    };
  }
  return emptyGames;
};

export default handleActions(
  {
    [ACTIONS.SAVED_FILES_RECEIVED]: (
      state: IFilesState,
      { payload }: { payload: { [key: string]: IFile } }
    ) => {
      const numberOfFiles = Object.keys(payload).length;
      const savedFiles = { ...payload, ...generateEmpty(numberOfFiles) };
      return { ...state, savedFiles };
    },
    [ACTIONS.FILE_SAVED]: (
      state: IFilesState,
      { payload }: { payload: IFile }
    ) => {
      const savedFiles = { ...state.savedFiles };
      const { id } = payload;
      savedFiles[id] = payload;
      return { ...state, fileJustSaved: id, savedFiles };
    },
    [ACTIONS.FILE_SAVED_RESET]: (state: IFilesState) => {
      return { ...state, fileJustSaved: '' };
    }
  },
  defaultState
);
