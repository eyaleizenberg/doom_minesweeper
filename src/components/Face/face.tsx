import * as React from 'react';
import * as classes from './face.scss';
import Sound from 'react-sound';
const dying = require('../../assets/images/faces/dying.gif');
const god = require('../../assets/images/faces/god.png');
const normal = require('../../assets/images/faces/normal.gif');
const death = require('../../assets/sounds/death.wav');
const victory = require('../../assets/sounds/victory.wav');

interface IFaceProps {
  isGameOver: boolean;
  isGameWon: boolean;
}

export default class Face extends React.PureComponent<IFaceProps> {
  buildUrl() {
    const { isGameOver, isGameWon } = this.props;

    if (isGameOver) {
      return dying;
    }

    if (isGameWon) {
      return god;
    }

    return normal;
  }

  render() {
    return (
      <div>
        <img
          src={this.buildUrl()}
          className={classes.container}
          data-protractor-hook={
            this.props.isGameOver ? 'deadFace' : 'aliveFace'
          }
        />
        <Sound
          url={death}
          playStatus={
            Sound.status[this.props.isGameOver ? 'PLAYING' : 'STOPPED']
          }
        />
        <Sound
          url={victory}
          playStatus={
            Sound.status[this.props.isGameWon ? 'PLAYING' : 'STOPPED']
          }
        />
      </div>
    );
  }
}
