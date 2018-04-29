import * as React from 'react';
import * as classes from './toolbar.scss';
import Face from '../Face/face';
import * as classnames from 'classnames';
import Sound from 'react-sound';
import ThemeMusic from '../ThemeMusic/themeMusic';

interface IToolbarProps {
  gameInProgress: boolean;
  toggleNewGame: () => void;
  isGameOver: boolean;
  isGameWon: boolean;
  timer: number;
  toggleSaveDialog: () => void;
  toggleLoadDialog: () => void;
}

class Toolbar extends React.PureComponent<IToolbarProps, null> {
  renderIntroBox(text, handleClick, protractorHook) {
    return (
      <div className={classes.introBox}>
        <span className={classnames(classes.text, classes.gameText)} onClick={handleClick} data-protractor-hook={protractorHook}>{text}</span>
      </div>
    );
  }

  renderFace() {
    const {isGameWon, isGameOver} = this.props;
    return (
      <div className={classes.face}>
        <Face isGameOver={isGameOver} isGameWon={isGameWon}/>
      </div>
    );
  }

  renderIntroContent() {
    return (
      <div className={classes.content}>
        <Sound
          url={`${window.__STATICS_BASE_URL__}/assets/sounds/doom2theme.mp3`}
          playStatus={Sound.status.PLAYING}
          />
        {this.renderIntroBox('NEW GAME', this.props.toggleNewGame, 'newGame')}
        {this.renderFace()}
        {this.renderIntroBox('LOAD GAME', this.props.toggleLoadDialog, 'loadGame')}
      </div>
    );
  }

  formatTime() {
    const {timer} = this.props;
    let d = Number(timer);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
  }

  renderInProgressContent() {
    const {isGameOver} = this.props;

    return (
      <div className={classes.content} data-protractor-hook={'inProgressToolbar'}>
        <ThemeMusic/>
        {this.renderInGameContainer(classes.demonsCount, '100')}
        {this.renderInGameContainer(classes.timer, this.formatTime())}
        {this.renderFace()}
        {this.renderInGameContainer(classes.health, isGameOver ? '0%' : '100%')}
        {this.renderInGameActions()}
      </div>
    );
  }

  renderInGameContainer(containerClass: string, text: string) {
    return (
      <div className={classnames(classes.inGameContainer, containerClass)}>
        <span className={classnames(classes.text, classes.statusText)}>{text}</span>
      </div>
    );
  }

  renderInGameActions() {
    const {toggleNewGame, toggleSaveDialog, toggleLoadDialog} = this.props;
    return (
      <div className={classnames(classes.inGameContainer, classes.inGameActions)}>
        <span onClick={toggleNewGame} className={classnames(classes.text, classes.gameText)}>NEW GAME</span>
        <span onClick={toggleSaveDialog} className={classnames(classes.text, classes.gameText)}>SAVE GAME</span>
        <span onClick={toggleLoadDialog} className={classnames(classes.text, classes.gameText)}>LOAD GAME</span>
      </div>
    );
  }

  render() {
    const {gameInProgress} = this.props;
    return (
      <div className={classnames(classes.container, {[classes.inProgress]: gameInProgress})} data-protractor-hook={'toolbar'}>
        {gameInProgress ? this.renderInProgressContent() : this.renderIntroContent()}
      </div>
    );
  }
}

export default Toolbar;
