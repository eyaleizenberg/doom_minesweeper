import * as React from 'react';
import * as classes from './logo.scss';
const logoImage = require('../../assets/images/logo.png');

export default class Logo extends React.PureComponent {
  render() {
    return (
      <div className={classes.container}>
        <img
          src={logoImage}
          className={classes.logo}
          data-protractor-hook={'logo'}
        />
        <span className={classes.text}>MINESWEEPER</span>
      </div>
    );
  }
}
