import * as ACTIONS from '../../constants/actionTypes';
import reducer from './cells';
import {expect} from 'chai';
import {ICell} from '../../interfaces/cellInterface';
declare const describe: any;
declare const it: any;

const initialData = {
  '0-0': {isExposed: false, x: 0, y: 0},
  '0-1': {isExposed: false, x: 0, y: 1},
  '9-9': {isExposed: false, x: 9, y: 9, isDemon: true}
};

describe('Cells Reducer', () => {
  it('should create a matrix according to the parameters', () => {
    const response = reducer({}, {type: ACTIONS.MATRIX_CREATED, payload: {width: 2, height: 2, totalDemons: 2}});
    const {width, height, totalDemons, sortedData, data} = response;
    const keys = Object.keys(data);

    expect(width).to.eql(2);
    expect(height).to.eql(2);
    expect(totalDemons).to.eql(2);
    expect(sortedData.length).to.eql(2);
    expect(sortedData[0].length).to.eql(2);
    expect(sortedData[1].length).to.eql(2);
    expect(keys.length).to.eql(4);
    expect(data[keys[0]]).to.include.all.keys(
      'adjacentDemons',
      'id',
      'isDemon',
      'isExposed',
      'isFlagged',
      'isKiller',
      'x',
      'y'
    );
  });

  it('should expose all the cells when the game is over and the killer', () => {
    const response = reducer({data: initialData}, {type: ACTIONS.GAME_OVER, payload: {cellId: '9-9'}});
    expect(response.data['0-0']).to.eql({isExposed: true, isKiller: false, x: 0, y: 0});
    expect(response.data['0-1']).to.eql({isExposed: true, isKiller: false, x: 0, y: 1});
    expect(response.data['9-9']).to.eql({isExposed: true, isKiller: true, x: 9, y: 9, isDemon: true});
  });

  it('should expose the cell', () => {
    const response = reducer({data: initialData}, {type: ACTIONS.CELL_EXPOSED, payload: {cellId: '0-0'}});
    expect(response.data['0-0'].isExposed).to.eql(true);
  });

  it('should expose empty adjacentCells', () => {
    const response = reducer({data: initialData}, {type: ACTIONS.EMPTY_CELL_EXPOSED, payload: {cellId: '0-0'}});
    expect(response.data['0-0'].isExposed).to.eql(true);
    expect(response.data['0-1'].isExposed).to.eql(true);
    expect(response.data['9-9'].isExposed).to.eql(false);
  });

  it('should toggle the flag on a cell', () => {
    const response = reducer({data: initialData}, {type: ACTIONS.CELL_FLAG_TOGGLED, payload: {cellId: '9-9'}});
    expect(response.data['9-9'].isFlagged).to.eql(true);
  });

  it('should expose all the cells when the game is won', () => {
    const response = reducer({data: initialData}, {type: ACTIONS.GAME_WON});
    expect(response.data['0-0'].isExposed).to.eql(true);
    expect(response.data['0-1'].isExposed).to.eql(true);
    expect(response.data['9-9'].isExposed).to.eql(true);
  });
});
