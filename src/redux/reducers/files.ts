import { handleActions } from 'redux-actions';
import * as ACTIONS from '../../constants/actionTypes';
import generateUuid from '../../utilities/generateUuid';
import { IFilesState } from '../../interfaces/fileInterface';
import { IGame } from '../../interfaces/gameInterface';

const MAX_FILES = 5;

export const defaultState = {
  savedFiles: {}
};

export const getSavedGames = (state: IFilesState): { [key: string]: IFile } =>
  state.savedFiles;
export const getFileJustSaved = (state: IFilesState) => state.fileJustSaved;

const generateEmpty = (existingGamesLength: number): IGame[] => {
  let emptyGames = [];
  for (let i = 0; i < MAX_FILES - existingGamesLength; i++) {
    emptyGames.push({
      id: generateUuid(),
      name: '',
      hasBeenSaved: false
    });
  }
  return emptyGames;
};

export default handleActions(
  {
    [ACTIONS.SAVED_FILES_RECEIVED]: (
      state: IFilesState,
      { payload }: { payload: IGame[] }
    ) => {
      const data =
        payload.length < MAX_FILES
          ? payload.concat(generateEmpty(payload.length))
          : payload;
      const savedFiles = data.reduce((res, file) => {
        return { ...res, [file.id]: file };
      }, {});
      return { ...state, savedFiles };
    },
    [ACTIONS.FILE_SAVED]: (
      state: IFilesState,
      { payload }: { payload: any }
    ) => {
      const savedFiles = { ...state.savedFiles };
      const { id } = payload;
      savedFiles[id] = JSON.parse(JSON.stringify(payload));
      return { ...state, fileJustSaved: id, savedFiles };
    },
    [ACTIONS.FILE_SAVED_RESET]: (state: IFilesState) => {
      return { ...state, fileJustSaved: null };
    }
  },
  defaultState
);
