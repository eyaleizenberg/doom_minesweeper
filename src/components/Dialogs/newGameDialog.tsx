import * as React from 'react';
import * as classes from './newGameDialog.scss';
import * as dialogClasses from './dialogs.scss';
import * as classnames from 'classnames';
import DEFAULT_GAME_LEVELS from '../../constants/defaultGameLevels';

interface NewGameDialogProps {
  initMatrix: (
    properties: { width: number; height: number; totalDemons: number }
  ) => void;
  showCustomGameDialog: () => void;
  toggleNewGame: () => void;
}

class NewGameDialog extends React.PureComponent<NewGameDialogProps> {
  handleClick = (event: any) => {
    const { width, height, totalDemons } = DEFAULT_GAME_LEVELS[
      event.target.getAttribute('data-levelid')
    ];
    this.props.initMatrix({ width, height, totalDemons });
  };

  handleCustomDialogClick = () => {
    this.props.showCustomGameDialog();
  };

  render() {
    return (
      <div className={dialogClasses.container}>
        <span
          onClick={this.props.toggleNewGame}
          className={dialogClasses.closeButton}
        >
          X
        </span>
        <div className={classes.textContainer}>
          <span className={dialogClasses.text}>NEW GAME</span>
          <span className={dialogClasses.text}>CHOOSE YOUR SKILL LEVEL:</span>
        </div>
        <div
          className={classnames(classes.textContainer, classes.levels)}
          data-protractor-hook={'levelsContainer'}
        >
          {Object.keys(DEFAULT_GAME_LEVELS).map(key => {
            const gameLevel = DEFAULT_GAME_LEVELS[key];
            return (
              <span
                key={gameLevel.id}
                data-levelid={gameLevel.id}
                className={classnames(dialogClasses.text, classes.text)}
                onClick={this.handleClick}
                data-protractor-hook={'gameLevel'}
              >
                {gameLevel.text}
              </span>
            );
          })}
          <span
            onClick={this.handleCustomDialogClick}
            className={classnames(dialogClasses.text, classes.text)}
          >
            YOUR PERSONAL NIGHTMARE...
          </span>
        </div>
      </div>
    );
  }
}

export default NewGameDialog;
