import * as React from 'react';
import * as classes from './loadDialog.scss';
import * as dialogClasses from './dialogs.scss';
import * as classnames from 'classnames';
import { IFile } from '../../interfaces/fileInterface';

interface ILoadDialogProps {
  savedFiles: { [key: string]: IFile };
  toggleLoadDialog: () => any;
  loadFile: (id: string) => any;
}

class LoadDialog extends React.PureComponent<
  ILoadDialogProps,
  { [key: string]: string }
> {
  handleClick = (event: any) => {
    const { target } = event;
    const element = target.nodeName === 'SPAN' ? target.parentElement : target;
    this.props.loadFile(element.dataset.id);
  };

  renderFiles() {
    return Object.keys(this.props.savedFiles).map(key => {
      const file = this.props.savedFiles[key];
      if (!file.hasBeenSaved) {
        return null;
      }

      return (
        <div
          key={file.id}
          className={classnames(dialogClasses.bigInput, classes.bigInput)}
          onClick={this.handleClick}
          data-id={file.id}
        >
          <span>{file.name}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={dialogClasses.container}>
        <span
          onClick={this.props.toggleLoadDialog}
          className={dialogClasses.closeButton}
        >
          X
        </span>
        <span className={classnames(dialogClasses.text, classes.title)}>
          LOAD GAME
        </span>
        {this.renderFiles()}
      </div>
    );
  }
}

export default LoadDialog;
