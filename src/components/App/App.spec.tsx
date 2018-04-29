import 'jsdom-global/register';
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store';
declare const describe: any;
declare const it: any;
declare const after: any;
// import { IState } from '../../interfaces/state';

const store = configureStore({});

describe('App', () => {
  let wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
    { attachTo: document.createElement('div') }
  );

  after(() => wrapper.detach());

  it('should renders a title correctly', () => {
    expect(
      wrapper.find(`[data-protractor-hook=\'mainContainer\']`).length
    ).to.eq(1);
  });

  it('should click the new game button and show the levels', () => {
    wrapper.find(`[data-protractor-hook=\'newGame\']`).simulate('click');
    expect(
      wrapper.find(`[data-protractor-hook=\'levelsContainer\']`).length
    ).to.eq(1);
  });

  it('should click on the im too young to die and get a 5x5 matrix', () => {
    wrapper
      .find(
        `[data-protractor-hook=\'levelsContainer\'] [data-protractor-hook=\'gameLevel\']`
      )
      .first()
      .simulate('click');
    const matrix = wrapper.find(`[data-protractor-hook=\'matrix\']`);
    expect(matrix.length).to.eql(1);
    expect(matrix.find(`[data-protractor-hook=\'cell\']`).length).to.eql(25);
  });

  // it('should click on a demon cell and loose the game', () => {
  //   const state: IState = store.getState();
  //   const { data } = state.cells;
  //   const keys = Object.keys(data);
  //   const demonCellId = keys.find(id => {
  //     return data[id].isDemon;
  //   });
  //   wrapper.find(`[data-cell-id=\'${demonCellId}\']`).simulate('click');
  //   expect(wrapper.find(`[data-protractor-hook=\'deadFace\']`).length).to.eql(
  //     1
  //   );
  // });
});
