import { connect } from 'react-redux';
import Cell from '../components/Cell/cell';
import { revealCell, toggleCellFlag } from '../redux/actions/cells';
import { getCellsData } from '../redux/reducers/cells';
import { ICellsState, ICell } from '../interfaces/cellInterface';
import { IGameState } from '../interfaces/gameInterface';

const mapStateToProps = (
  { cells, game }: { cells: ICellsState; game: IGameState },
  { id }: { id: string }
) => {
  const { isGameWon, isGameOver } = game;
  const cell: ICell = getCellsData(cells)[id];
  return {
    ...cell,
    isGameWon,
    isGameOver
  };
};

export default connect(mapStateToProps, { revealCell, toggleCellFlag })(Cell);
