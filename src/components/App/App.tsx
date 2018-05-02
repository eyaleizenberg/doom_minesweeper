import * as React from 'react';
import MainContainer from '../../containers/MainContainer';

export default class Minesweeper extends React.PureComponent {
  componentDidMount() {
    window.postMessage(
      'gameLoaded',
      'https://wix-incubator.github.io/mastermind'
    );
  }

  render() {
    return <MainContainer />;
  }
}
