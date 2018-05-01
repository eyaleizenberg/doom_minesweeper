import * as React from 'react';
import * as classes from './cell.scss';
import * as classnames from 'classnames';
import CellContent from './cellContent';
import { ICell } from '../../interfaces/cellInterface';
const barrel = require('../../assets/images/barrel.png');

interface ICellProps {
  cell: ICell;
  revealCell: (id: string) => any;
  toggleCellFlag: (id: string) => any;
  isGameWon: boolean;
  isGameOver: boolean;
  id: string;
}

class Cell extends React.PureComponent<ICellProps> {
  handleClick = () => {
    const {
      revealCell,
      cell: { id, isFlagged }
    } = this.props;
    if (!isFlagged) {
      revealCell(id);
    }
  };

  handleContextMenu = (event: any) => {
    event.preventDefault();
    const {
      toggleCellFlag,
      cell: { id, isExposed }
    } = this.props;
    if (!isExposed) {
      toggleCellFlag(id);
    }
  };

  renderFlag() {
    return <img className={classes.flag} src={barrel} />;
  }

  render() {
    const {
      cell: {
        isDemon,
        adjacentDemons,
        isExposed,
        demonId,
        isKiller,
        id,
        isFlagged
      },
      isGameWon,
      isGameOver
    } = this.props;

    return (
      <div
        className={classnames(classes.cell, { [classes.isExposed]: isExposed })}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
        data-protractor-hook={'cell'}
        data-cell-id={id}
      >
        {isFlagged && this.renderFlag()}
        {isExposed && (
          <CellContent
            adjacentDemons={adjacentDemons}
            isDemon={isDemon}
            demonId={demonId}
            isKiller={isKiller}
            isDead={isGameWon}
            isFlagged={isFlagged}
            isGameOver={isGameOver}
          />
        )}
      </div>
    );
  }
}

export default Cell;
