import * as React from 'react';
import * as classes from './cellContent.scss';
import * as classnames from 'classnames';

const demons = {
  '0': require('../../assets/images/demons/0.png'),
  '0_dead': require('../../assets/images/demons/0_dead.png'),
  '1': require('../../assets/images/demons/1.png'),
  '1_dead': require('../../assets/images/demons/1_dead.png'),
  '2': require('../../assets/images/demons/2.png'),
  '2_dead': require('../../assets/images/demons/2_dead.png'),
  '3': require('../../assets/images/demons/3.png'),
  '3_dead': require('../../assets/images/demons/3_dead.png'),
  '4': require('../../assets/images/demons/4.png'),
  '4_dead': require('../../assets/images/demons/4_dead.png'),
  '5': require('../../assets/images/demons/5.png'),
  '5_dead': require('../../assets/images/demons/5_dead.png'),
  '6': require('../../assets/images/demons/6.png'),
  '6_dead': require('../../assets/images/demons/6_dead.png'),
  '7': require('../../assets/images/demons/7.png'),
  '7_dead': require('../../assets/images/demons/7_dead.png'),
  '8': require('../../assets/images/demons/8.png'),
  '8_dead': require('../../assets/images/demons/8_dead.png'),
  '9': require('../../assets/images/demons/9.png'),
  '9_dead': require('../../assets/images/demons/9_dead.png'),
  '10': require('../../assets/images/demons/10.png'),
  '10_dead': require('../../assets/images/demons/10_dead.png'),
  '11': require('../../assets/images/demons/11.png'),
  '11_dead': require('../../assets/images/demons/11_dead.png')
};

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
  ICellContentProps
> {
  renderDemon() {
    const { isKiller, demonId, isDead } = this.props;

    if (!demonId) {
      return null;
    }

    let demonFullId: string = demonId.toString();

    if (isDead) {
      demonFullId += '_dead';
    }

    return (
      <img
        className={classnames(classes.demon, { [classes.isKiller]: isKiller })}
        src={demons[demonFullId]}
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
