import * as React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../components/Toolbar/toolbar';
import {toggleNewGame, toggleSaveDialog, toggleLoadDialog} from '../redux/actions/game';

const mapStateToProps = ({game}) => {
  const {gameInProgress, isGameOver, isGameWon, timer} = game;
  return {
    gameInProgress,
    isGameOver,
    isGameWon,
    timer
  };
};

export default connect(mapStateToProps, {toggleNewGame, toggleSaveDialog, toggleLoadDialog})(Toolbar);
