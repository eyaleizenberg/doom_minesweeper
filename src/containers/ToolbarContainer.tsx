import { connect } from 'react-redux';
import Toolbar from '../components/Toolbar/toolbar';
import { IGameState } from '../interfaces/gameInterface';
import {
  getGameInProgress,
  getIsGameOver,
  getIsGameWon,
  getTimer
} from '../redux/reducers/game';
import {
  toggleNewGame,
  toggleSaveDialog,
  toggleLoadDialog
} from '../redux/actions/game';

const mapStateToProps = ({ game }: { game: IGameState }) => {
  return {
    gameInProgress: getGameInProgress(game),
    isGameOver: getIsGameOver(game),
    isGameWon: getIsGameWon(game),
    timer: getTimer(game)
  };
};

export default connect(mapStateToProps, {
  toggleNewGame,
  toggleSaveDialog,
  toggleLoadDialog
})(Toolbar);
