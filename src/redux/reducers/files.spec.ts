import * as ACTIONS from '../../constants/actionTypes';
import reducer from './files';
import {expect} from 'chai';
declare const describe: any;
declare const it: any;

describe('Files Reducer', () => {
  it('should generate 5 empty files', () => {
    const response = reducer({}, {type: ACTIONS.SAVED_FILES_RECEIVED, payload: []});
    const keys = Object.keys(response.savedFiles);
    expect(keys.length).to.eql(5);
    const file = response.savedFiles[keys[0]];
    expect(file).to.have.property('hasBeenSaved', false);
    expect(file).to.have.all.keys('id', 'name', 'hasBeenSaved');
  });

  it('should add the file to the savedFiles and mark it as just been saved', () => {
    const file = {id: '123', name: 'some name', hasBeenSaved: true};
    const response = reducer(
      {},
      {type: ACTIONS.FILE_SAVED, payload: file}
    );

    expect(response.fileJustSaved).to.eql('123');
    expect(response.savedFiles['123']).to.eql(file);
  });

  it('should reset the fileJustSaved property', () => {
    const response = reducer({}, {type: ACTIONS.FILE_SAVED_RESET});
    expect(response.fileJustSaved).to.eql(null);
  });
});
