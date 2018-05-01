import { connect } from 'react-redux';
import Main from '../components/Main/main';
import { initMatrix } from '../redux/actions/cells';
import { showCustomGameDialog, toggleNewGame } from '../redux/actions/game';
import { fetchSaved } from '../redux/actions/files';
import { ICellsState } from '../interfaces/cellInterface';
import { IGameState } from '../interfaces/gameInterface';
import { getSortedData } from '../redux/reducers/cells';
import {
  getIsGameOver,
  getIsGameWon,
  getNewGameDialogShown,
  getGameInProgress,
  getCustomGameDialogShown,
  getSaveDialogShown,
  getLoadDialogShown
} from '../redux/reducers/game';

const mapStateToProps = ({
  cells,
  game
}: {
  cells: ICellsState;
  game: IGameState;
}) => {
  return {
    sortedData: getSortedData(cells),
    isGameOver: getIsGameOver(game),
    isGameWon: getIsGameWon(game),
    newGameDialogShown: getNewGameDialogShown(game),
    gameInProgress: getGameInProgress(game),
    customGameDialogShown: getCustomGameDialogShown(game),
    saveDialogShown: getSaveDialogShown(game),
    loadDialogShown: getLoadDialogShown(game)
  };
};

export default connect(mapStateToProps, {
  initMatrix,
  showCustomGameDialog,
  fetchSaved,
  toggleNewGame
})(Main);
