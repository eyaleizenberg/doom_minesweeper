import { connect } from 'react-redux';
import Main from '../components/Main/main';
import { initMatrix } from '../redux/actions/cells';
import { showCustomGameDialog, toggleNewGame } from '../redux/actions/game';
import { fetchSaved } from '../redux/actions/files';
import { ICellsState } from '../interfaces/cellInterface';
import { IGameState } from '../interfaces/gameInterface';

const mapStateToProps = ({ cells: ICellsState, game: IGameState }) => {
  const {
    isGameOver,
    isGameWon,
    newGameDialogShown,
    gameInProgress,
    customGameDialogShown,
    saveDialogShown,
    loadDialogShown
  } = game;

  return {
    sortedData: cells.sortedData,
    isGameOver,
    isGameWon,
    newGameDialogShown,
    gameInProgress,
    customGameDialogShown,
    saveDialogShown,
    loadDialogShown
  };
};

export default connect(mapStateToProps, {
  initMatrix,
  showCustomGameDialog,
  fetchSaved,
  toggleNewGame
})(Main);
