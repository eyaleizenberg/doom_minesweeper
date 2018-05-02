import * as React from 'react';
import MainContainer from '../../containers/MainContainer';

export default class Minesweeper extends React.PureComponent {
  componentDidMount() {
    window.postMessage('gameLoaded', '*');
  }

  render() {
    return <MainContainer />;
  }
}
