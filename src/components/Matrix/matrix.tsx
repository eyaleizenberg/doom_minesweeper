import * as React from 'react';
import CellContainer from '../../containers/CellContainer';
import * as classes from './matrix.scss';
import * as classnames from 'classnames';

interface IMatrixProps {
  sortedData: string[][];
  preventClicks: boolean;
}

class Matrix extends React.PureComponent<IMatrixProps, null> {
  renderCells() {
    return this.props.sortedData.map((column, columnIndex) => (
      <div className={classes.column} key={columnIndex}>
        {
          column.map(id => <CellContainer key={id} id={id}/>)
        }
      </div>
    ));
  }

  render() {
    return (
      <div className={classnames(classes.container, {[classes.gameOver]: this.props.preventClicks})} data-protractor-hook={'matrix'}>
        {this.renderCells()}
      </div>
    );
  }
}

export default Matrix;
