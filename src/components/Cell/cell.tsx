import * as React from 'react';
import * as classes from './cell.scss';
import * as classnames from 'classnames';
import CellContent from './cellContent';

interface ICellProps {
  id: string;
  isDemon: boolean;
  demonId?: number;
  isExposed: boolean;
  x: number;
  y: number;
  adjacentDemons: number;
  isKiller: boolean;
  isFlagged: boolean;
  revealCell: (cellId: string) => any;
  toggleCellFlag: (cellId: string) => any;
  isGameWon: boolean;
  isGameOver: boolean;
}

class Cell extends React.PureComponent<ICellProps, null> {
  handleClick = () => {
    const { revealCell, id, isFlagged } = this.props;
    if (!isFlagged) {
      revealCell(id);
    }
  };

  handleContextMenu = (event: any) => {
    event.preventDefault();
    const { toggleCellFlag, id, isExposed } = this.props;
    if (!isExposed) {
      toggleCellFlag(id);
    }
  };

  renderFlag() {
    return (
      <img
        className={classes.flag}
        src={`${window.__STATICS_BASE_URL__}/assets/images/barrel.png`}
      />
    );
  }

  render() {
    const {
      isDemon,
      adjacentDemons,
      isExposed,
      demonId,
      isKiller,
      isFlagged,
      isGameWon,
      isGameOver,
      id
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
