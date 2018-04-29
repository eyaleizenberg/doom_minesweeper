import * as React from 'react';
import * as classes from './cellContent.scss';
import * as classnames from 'classnames';

interface ICellContentProps {
  demonId?: number;
  adjacentDemons: number;
  isDemon: boolean;
  isKiller: boolean;
  isDead: boolean;
  isFlagged: boolean;
  isGameOver: boolean;
}

export default class CellContent extends React.PureComponent<
  ICellContentProps,
  null
> {
  renderDemon() {
    const { isKiller, demonId, isDead } = this.props;
    let demonFullId = demonId && demonId.toString();

    if (isDead) {
      demonFullId += '_dead';
    }

    return (
      <img
        className={classnames(classes.demon, { [classes.isKiller]: isKiller })}
        src={`${
          window.__STATICS_BASE_URL__
        }/assets/images/demons/${demonFullId}.png`}
      />
    );
  }

  renderAdjacentCount() {
    const { adjacentDemons } = this.props;

    return (
      <span
        title={adjacentDemons.toString()}
        className={classnames(
          classes.adjacentDemons,
          classes[`count${adjacentDemons}`]
        )}
      >
        {adjacentDemons}
      </span>
    );
  }

  render() {
    const { isDemon, adjacentDemons, isFlagged, isGameOver } = this.props;

    if (isDemon && !isFlagged) {
      return this.renderDemon();
    }

    if (adjacentDemons > 0 && !isFlagged) {
      return this.renderAdjacentCount();
    }

    if (isGameOver && isFlagged && !isDemon) {
      return <span className={classes.wrongFlag}>X</span>;
    }

    return null;
  }
}
