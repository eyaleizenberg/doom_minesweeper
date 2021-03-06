import * as React from 'react';
import * as classes from './toolbar.scss';
import Face from '../Face/face';
import * as classnames from 'classnames';
import Sound from 'react-sound';
import ThemeMusic from '../ThemeMusic/themeMusic';
const doom2theme = require('../../assets/sounds/doom2theme.mp3');

interface IToolbarProps {
  gameInProgress: boolean;
  toggleNewGame: () => any;
  isGameOver: boolean;
  isGameWon: boolean;
  timer: number;
  toggleSaveDialog: () => any;
  toggleLoadDialog: () => any;
}

class Toolbar extends React.PureComponent<IToolbarProps> {
  renderIntroBox(
    text: string,
    handleClick: () => void,
    protractorHook: string
  ): JSX.Element {
    return (
      <div className={classes.introBox}>
        <span
          className={classnames(classes.text, classes.gameText)}
          onClick={handleClick}
          data-protractor-hook={protractorHook}
        >
          {text}
        </span>
      </div>
    );
  }

  renderFace(): JSX.Element {
    const { isGameWon, isGameOver } = this.props;
    return (
      <div className={classes.face}>
        <Face isGameOver={isGameOver} isGameWon={isGameWon} />
      </div>
    );
  }

  renderIntroContent(): JSX.Element {
    return (
      <div className={classes.content}>
        <Sound url={doom2theme} playStatus={Sound.status.PLAYING} />
        {this.renderIntroBox('NEW GAME', this.props.toggleNewGame, 'newGame')}
        {this.renderFace()}
        {this.renderIntroBox(
          'LOAD GAME',
          this.props.toggleLoadDialog,
          'loadGame'
        )}
      </div>
    );
  }

  formatTime(): string {
    const { timer } = this.props;
    let d = Number(timer);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
  }

  renderInProgressContent(): JSX.Element {
    const { isGameOver } = this.props;

    return (
      <div
        className={classes.content}
        data-protractor-hook={'inProgressToolbar'}
      >
        <ThemeMusic />
        {this.renderInGameContainer(classes.demonsCount, '100')}
        {this.renderInGameContainer(classes.timer, this.formatTime())}
        {this.renderFace()}
        {this.renderInGameContainer(classes.health, isGameOver ? '0%' : '100%')}
        {this.renderInGameActions()}
      </div>
    );
  }

  renderInGameContainer(containerClass: string, text: string): JSX.Element {
    return (
      <div className={classnames(classes.inGameContainer, containerClass)}>
        <span className={classnames(classes.text, classes.statusText)}>
          {text}
        </span>
      </div>
    );
  }

  renderInGameActions(): JSX.Element {
    const { toggleNewGame, toggleSaveDialog, toggleLoadDialog } = this.props;
    return (
      <div
        className={classnames(classes.inGameContainer, classes.inGameActions)}
      >
        <span
          onClick={toggleNewGame}
          className={classnames(classes.text, classes.gameText)}
        >
          NEW GAME
        </span>
        <span
          onClick={toggleSaveDialog}
          className={classnames(classes.text, classes.gameText)}
        >
          SAVE GAME
        </span>
        <span
          onClick={toggleLoadDialog}
          className={classnames(classes.text, classes.gameText)}
        >
          LOAD GAME
        </span>
      </div>
    );
  }

  render(): JSX.Element {
    const { gameInProgress } = this.props;
    return (
      <div
        className={classnames(classes.container, {
          [classes.inProgress]: gameInProgress
        })}
        data-protractor-hook={'toolbar'}
      >
        {gameInProgress
          ? this.renderInProgressContent()
          : this.renderIntroContent()}
      </div>
    );
  }
}

export default Toolbar;
