import * as React from 'react';
import * as classes from './main.scss';
import Matrix from '../Matrix/matrix';
import ToolbarContainer from '../../containers/ToolbarContainer';
import NewGameDialog from '../Dialogs/newGameDialog';
import CustomGameDialog from '../Dialogs/customGameDialog';
import Logo from '../Logo/logo';
import SaveDialogContainer from '../../containers/saveDialogContainer';
import LoadDialogContainer from '../../containers/loadDialogContainer';

const initialWidth: number = 1200;

interface IMainProps {
  initMatrix: (
    properties: { width: number; height: number; totalDemons: number }
  ) => any;
  sortedData: string[][];
  isGameOver: boolean;
  isGameWon: boolean;
  newGameDialogShown: boolean;
  gameInProgress: boolean;
  showCustomGameDialog: () => any;
  customGameDialogShown: boolean;
  saveDialogShown: boolean;
  loadDialogShown: boolean;
  toggleNewGame: () => any;
  fetchSaved: () => any;
}

interface IMainState {
  scaleRatio: number;
}

class Main extends React.PureComponent<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      scaleRatio: this.calcRatio()
    };
  }

  calcRatio() {
    return window.innerWidth / initialWidth;
  }

  onResize = () => this.setState({ scaleRatio: this.calcRatio() });

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.props.fetchSaved();
  }

  renderMatrix() {
    const { sortedData, isGameOver, isGameWon } = this.props;
    return (
      <Matrix sortedData={sortedData} preventClicks={isGameWon || isGameOver} />
    );
  }

  renderContent() {
    const {
      newGameDialogShown,
      gameInProgress,
      initMatrix,
      showCustomGameDialog,
      customGameDialogShown,
      saveDialogShown,
      toggleNewGame,
      loadDialogShown
    } = this.props;

    if (newGameDialogShown) {
      return (
        <NewGameDialog
          initMatrix={initMatrix}
          showCustomGameDialog={showCustomGameDialog}
          toggleNewGame={toggleNewGame}
        />
      );
    }

    if (customGameDialogShown) {
      return <CustomGameDialog initMatrix={initMatrix} />;
    }

    if (saveDialogShown) {
      return <SaveDialogContainer />;
    }

    if (loadDialogShown) {
      return <LoadDialogContainer />;
    }

    if (gameInProgress) {
      return this.renderMatrix();
    }

    return <Logo />;
  }

  render() {
    return (
      <div className={classes.mainWrapper}>
        <div
          style={{ transform: `scale(${this.state.scaleRatio})` }}
          className={classes.main}
          data-protractor-hook={'mainContainer'}
        >
          <div className={classes.content}>{this.renderContent()}</div>
          <ToolbarContainer />
        </div>
      </div>
    );
  }
}

export default Main;
