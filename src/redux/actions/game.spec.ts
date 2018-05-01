import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './game';
import * as ACTIONS from '../../constants/actionTypes';
import { expect } from 'chai';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
declare const describe: any;
declare const it: any;

describe('Game Actions', () => {
  [
    { actionName: 'toggleNewGame', constant: ACTIONS.TOGGLE_NEW_GAME_DIALOG },
    {
      actionName: 'showCustomGameDialog',
      constant: ACTIONS.SHOW_CUSTOM_GAME_DIALOG
    },
    { actionName: 'toggleSaveDialog', constant: ACTIONS.SAVE_DIALOG_TOGGLED },
    { actionName: 'toggleLoadDialog', constant: ACTIONS.LOAD_DIALOG_TOGGLED }
  ].forEach(actionPair => {
    it(`should fire the ${actionPair.actionName} dialog action`, () => {
      const store = mockStore({});
      actions[actionPair.actionName]()(store.dispatch);
      expect(store.getActions()).to.eql([{ type: actionPair.constant }]);
    });
  });
});
