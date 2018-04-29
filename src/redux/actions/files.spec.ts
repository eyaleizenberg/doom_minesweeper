import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './files';
import * as ACTIONS from '../../constants/actionTypes';
import {expect} from 'chai';
import * as nock from 'nock';
import {getGamesRoute} from '../../constants/routes';
import {getTestBaseUrl} from '../../../test/test-common';

const baseUrl = getTestBaseUrl();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
declare const describe: any;
declare const it: any;

const file = {
  id: '123',
  name: 'name',
  state: {
    game: 'a game',
    cells: 'a cell'
  }
};

describe('Files Actions', () => {
  it('fetch the saved files and dispatch the files received event', () => {
    nock(baseUrl)
      .get(getGamesRoute('testUser'))
      .reply(200, 'some data');

    const store = mockStore({});
    actions.fetchSaved()(store.dispatch);
    setTimeout(() => {
      expect(store.getActions()[0]).to.eql({
        type: ACTIONS.SAVED_FILES_RECEIVED,
        payload: 'some data'
      });
    }, 100);
  });

  it('post the file and dispatch the file saved event', () => {
    nock(baseUrl)
      .post(getGamesRoute('testUser'))
      .reply(200, 'some data');

    const store = mockStore({
      game: {},
      cells: {}
    });

    actions.saveFile(file)(store.dispatch, store.getState);
    setTimeout(() => {
      expect(store.getActions()[0]).to.eql({
        type: ACTIONS.FILE_SAVED,
        payload: 'some data'
      });
    }, 100);
  });

  it('load a new state and dispatch the game loaded event', () => {
    const files = {
      savedFiles: {
        123: {
          state: {
            game: {},
            cells: {}
          }
        }
      }
    };

    const store = mockStore({files});
    actions.loadFile('123')(store.dispatch, store.getState);
    expect(store.getActions()[0]).to.eql(
      {
        type: ACTIONS.FILE_LOADED,
        payload: {
          cells: {},
          files,
          game: {
            saveDialogShown: false
          }
        }
      }
    );
  });
});
