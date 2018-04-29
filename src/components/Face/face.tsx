import * as React from 'react';
import * as classes from './face.scss';
import Sound from 'react-sound';

interface IFaceProps {
  isGameOver: boolean;
  isGameWon: boolean;
}

export default class Face extends React.PureComponent<IFaceProps, null> {
  buildUrl() {
    const {isGameOver, isGameWon} = this.props;
    const baseUrl = `${window.__STATICS_BASE_URL__}/assets/images/faces/`;

    if (isGameOver) {
      return baseUrl + 'dying.gif';
    }

    if (isGameWon) {
      return baseUrl + 'god.png';
    }

    return baseUrl + 'normal.gif';
  }

  render() {
    return (
      <div>
        <img
          src={this.buildUrl()}
          className={classes.container}
          data-protractor-hook={this.props.isGameOver ? 'deadFace' : 'aliveFace'}
          />
        <Sound
          url={`${window.__STATICS_BASE_URL__}/assets/sounds/death.wav`}
          playStatus={Sound.status[this.props.isGameOver ? 'PLAYING' : 'STOPPED']}
          />
        <Sound
          url={`${window.__STATICS_BASE_URL__}/assets/sounds/victory.wav`}
          playStatus={Sound.status[this.props.isGameWon ? 'PLAYING' : 'STOPPED']}
          />
      </div>
    );
  }
}
