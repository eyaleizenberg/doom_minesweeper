import * as React from 'react';
import * as classes from './logo.scss';

export default class Logo extends React.PureComponent {
  render() {
    return (
      <div className={classes.container}>
        <img src={`${window.__STATICS_BASE_URL__}/assets/images/logo.png`} className={classes.logo} data-protractor-hook={'logo'}/>
        <span className={classes.text}>MINESWEEPER</span>
      </div>
    );
  }
}
