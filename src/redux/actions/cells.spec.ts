import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './cells';
import * as ACTIONS from '../../constants/actionTypes';
import {expect} from 'chai';
import * as sinon from 'sinon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
declare const describe: any;
declare const it: any;

const mockCells = {
  '0-0': {
    id: '0-0',
    isDemon: false,
    isExposed: false,
    x: 0,
    y: 0,
    adjacentDemons: 0,
    isKiller: false,
    isFlagged: false
  },
  '1-0': {
    id: '1-0',
    isDemon: true,
    isExposed: true,
    x: 1,
    y: 0,
    adjacentDemons: 0,
    isKiller: false,
    isFlagged: false
  },
  '2-0': {
    id: '2-0',
    isDemon: false,
    isExposed: false,
    x: 1,
    y: 0,
    adjacentDemons: 1,
    isKiller: false,
    isFlagged: false
  }
};

const initStoreWithData = () => (
  mockStore({
    cells: {
      data: mockCells,
      totalDemons: 1
    }
  })
);

describe('Cells Actions', () => {
  it('should init the matrix with integers', () => {
    const store = mockStore({});
    actions.initMatrix({width: '3', height: '4', totalDemons: '5'})(store.dispatch);
    expect(store.getActions()[0]).to.eql(
      {
        type: ACTIONS.MATRIX_CREATED,
        payload: {
          width: 3,
          height: 4,
          totalDemons: 5
        }
      }
    );
  });

  it('should start the timer after initing the matrix', () => {
    const clock = sinon.useFakeTimers();
    const store = mockStore({});
    actions.initMatrix({width: '3', height: '4', totalDemons: '5'})(store.dispatch);
    clock.tick(1500);
    expect(store.getActions()[1]).to.eql(
      {
        type: ACTIONS.TIMER_TICK
      }
    );

    clock.restore();
  });

  it('should should dispatch the toggle cell flag with the cell id', () => {
    const store = mockStore({});
    actions.toggleCellFlag('1a2b3c')(store.dispatch);
    expect(store.getActions()[0]).to.eql(
      {
        type: ACTIONS.CELL_FLAG_TOGGLED,
        payload: {cellId: '1a2b3c'}
      }
    );
  });

  it('should count the number of unexposed cells', () => {
    const count = actions._countUnExposedCells(mockCells);

    expect(count).to.eql(2);
  });

  it('should dispatch the game won action if the number of unexposed is the number of demons', () => {
    const store = mockStore({
      cells: {
        data: mockCells,
        totalDemons: 2
      }
    });
    actions._dispatchGameWonIfNeeded(store.dispatch, store.getState);
    expect(store.getActions()[0]).to.eql({type: ACTIONS.GAME_WON});
  });

  it('should not dispatch the game won action if there are demons', () => {
    const store = initStoreWithData();
    actions._dispatchGameWonIfNeeded(store.dispatch, store.getState);
    expect(store.getActions()).to.eql([]);
  });

  it('should not dispatch the game won action if there are demons left', () => {
    const store = mockStore({
      cells: {
        data: mockCells,
        totalDemons: 10
      }
    });
    actions._dispatchGameWonIfNeeded(store.dispatch, store.getState);
    expect(store.getActions()).to.eql([]);
  });

  it('should dispatch the game over if cell is a demon', () => {
    const store = initStoreWithData();
    actions.revealCell('1-0')(store.dispatch, store.getState);
    expect(store.getActions()[0]).to.eql({
      type: ACTIONS.GAME_OVER,
      payload: {cellId: '1-0'}
    });
  });

  it('should dispatch the cell exposed action', () => {
    const store = initStoreWithData();
    actions.revealCell('2-0')(store.dispatch, store.getState);
    expect(store.getActions()[0]).to.eql({
      type: ACTIONS.CELL_EXPOSED,
      payload: {cellId: '2-0'}
    });
  });

  it('should dispatch the empty cell exposed actin', () => {
    const store = initStoreWithData();
    actions.revealCell('0-0')(store.dispatch, store.getState);
    expect(store.getActions()[0]).to.eql({
      type: ACTIONS.EMPTY_CELL_EXPOSED,
      payload: {cellId: '0-0'}
    });
  });
});
