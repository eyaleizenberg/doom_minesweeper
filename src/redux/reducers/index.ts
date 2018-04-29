import { combineReducers } from 'redux';
import cells from './cells';
import game from './game';
import files from './files';
import * as ACTIONS from '../../constants/actionTypes';
import { IState } from '../../interfaces/state';

interface IAction {
  type: string;
  payload: any;
}

const appReducer = combineReducers({
  cells,
  game,
  files
});

const rootReducer = (state: IState, action: IAction) => {
  if (action.type === ACTIONS.FILE_LOADED) {
    state = action.payload;
  }

  return appReducer(state, action);
};

export default rootReducer;
