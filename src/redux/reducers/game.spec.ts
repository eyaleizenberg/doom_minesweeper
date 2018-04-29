import * as ACTIONS from '../../constants/actionTypes';
import reducer, {defaultState} from './game';
import {expect} from 'chai';
declare const describe: any;
declare const it: any;

describe('Game Reducer', () => {
  it('should make the isGameOver true', () => {
    const response = reducer({}, {type: ACTIONS.GAME_OVER});
    expect(response).to.eql({isGameOver: true});
  });

  it('should toggle the new game dialog and hide the others', () => {
    const response = reducer(
      {
        loadDialogShown: true, saveDialogShown: true, newGameDialogShown: false
      },
      {
        type: ACTIONS.TOGGLE_NEW_GAME_DIALOG
      }
    );

    expect(response).to.eql({
      loadDialogShown: false, saveDialogShown: false, newGameDialogShown: true
    });
  });

  it('should start the game and reset everything', () => {
    const response = reducer({isGameOver: true, gameInProgress: false}, {type: ACTIONS.MATRIX_CREATED});
    expect(response).to.eql({...defaultState, gameInProgress: true});
  });

  it('should show the custom game dialog and hide the new game dialog', () => {
    const response = reducer({}, {type: ACTIONS.SHOW_CUSTOM_GAME_DIALOG});
    expect(response).to.eql({customGameDialogShown: true, newGameDialogShown: false});
  });

  it('should mark the isGameWon', () => {
    const response = reducer({}, {type: ACTIONS.GAME_WON});
    expect(response).to.eql({isGameWon: true});
  });

  it('should increase the timer by one', () => {
    const response = reducer({timer: 0}, {type: ACTIONS.TIMER_TICK});
    expect(response).to.eql({timer: 1});
  });

  it('should toggle the save dialog and hide the rest', () => {
    const response = reducer(
      {
        loadDialogShown: true, saveDialogShown: false, newGameDialogShown: true
      },
      {
        type: ACTIONS.SAVE_DIALOG_TOGGLED
      }
    );

    expect(response).to.eql({
      loadDialogShown: false, saveDialogShown: true, newGameDialogShown: false
    });
  });

  it('should toggle the load game dialog and hide the others', () => {
    const response = reducer(
      {
        loadDialogShown: false, saveDialogShown: true, newGameDialogShown: true
      },
      {
        type: ACTIONS.LOAD_DIALOG_TOGGLED
      }
    );

    expect(response).to.eql({
      loadDialogShown: true, saveDialogShown: false, newGameDialogShown: false
    });
  });
});
