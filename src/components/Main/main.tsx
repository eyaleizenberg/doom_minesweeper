import * as React from 'react'  ;
import * as classes from './main.scss';
import Matrix from '../Matrix/matrix';
import ToolbarContainer from '../../containers/ToolbarContainer';
import NewGameDialog from '../Dialogs/newGameDialog';
import CustomGameDialog from '../Dialogs/customGameDialog';
import Logo from '../Logo/logo';
import SaveDialogContainer from '../../containers/saveDialogContainer';
import LoadDialogContainer from '../../containers/loadDialogContainer';

interface IMainProps {
  initMatrix: (properties: { width: number, height: number, totalDemons: number }) => void;
  sortedData?: string[][];
  isGameOver: boolean;
  isGameWon: boolean;
  newGameDialogShown: boolean;
  gameInProgress: boolean;
  showCustomGameDialog: () => void;
  customGameDialogShown: boolean;
  saveDialogShown: boolean;
  loadDialogShown: boolean;
  toggleNewGame: () => void;
  fetchSaved: () => void;
}

class Main extends React.PureComponent<IMainProps, null> {
  componentWillMount() {
    this.props.fetchSaved();
  }

  renderMatrix() {
    const {sortedData, isGameOver, isGameWon} = this.props;
    return (
      <Matrix sortedData={sortedData} preventClicks={isGameWon || isGameOver}/>
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
      return <NewGameDialog initMatrix={initMatrix} showCustomGameDialog={showCustomGameDialog} toggleNewGame={toggleNewGame}/>;
    }

    if (customGameDialogShown) {
      return <CustomGameDialog initMatrix={initMatrix}/>;
    }

    if (saveDialogShown) {
      return <SaveDialogContainer/>;
    }

    if (loadDialogShown) {
      return <LoadDialogContainer/>;
    }

    if (gameInProgress) {
      return this.renderMatrix();
    }

    return (
      <Logo/>
    );
  }

  render() {
    return (
      <div className={classes.main} data-protractor-hook={'mainContainer'}>
        <div className={classes.content}>
          {this.renderContent()}
        </div>
        <ToolbarContainer/>
      </div>
    );
  }
}

export default Main;
