import * as React from 'react';
import * as classes from './saveDialog.scss';
import * as dialogClasses from './dialogs.scss';
import * as classnames from 'classnames';
import IFile from '../../interfaces/fileInterface';

interface ISaveDialogProps {
  savedFiles: {[key: string]: IFile};
  saveFile: (IFile) => void;
  fileJustSaved?: string;
  toggleSaveDialog: () => void;
}

class SaveDialog extends React.PureComponent<ISaveDialogProps, { [key: string]: string; }> {
  constructor(props) {
    super(props);
    const data = this.buildStateFromProps(props);
    this.state = {...data};
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.savedFiles !== this.props.savedFiles) {
      const data = this.buildStateFromProps(nextProps);
      this.setState({...data});
    }
  }

  buildStateFromProps(props) {
    return Object.keys(props.savedFiles).reduce((res, key) => {
      const file = props.savedFiles[key];
      return {...res, [file.id]: file.name};
    }, {});
  }

  handleChange = (event) => {
    const {dataset, value} = event.target;
    this.setState({[dataset.id]: value});
  }

  handleSave = (event) => {
    const {id, name} = event.target.dataset;
    this.props.saveFile({id, name});
  }

  renderSave(file) {
    const currentValue = this.state[file.id];
    if (currentValue && currentValue !== file.name) {
      return (
        <img
          src={`${window.__STATICS_BASE_URL__}/assets/images/floppy.png`}
          className={classes.floppy}
          data-id={file.id}
          data-name={currentValue}
          onClick={this.handleSave}
          />
      );
    }
  }

  renderCheckmark(file) {
    if (file.id === this.props.fileJustSaved) {
      return (
        <img
          src={`${window.__STATICS_BASE_URL__}/assets/images/checkmark.png`}
          className={classes.checkmark}
          />
      );
    }
  }

  renderFiles() {
    return (
      Object.keys(this.props.savedFiles).map(key => {
        const file = this.props.savedFiles[key];
        const currentValue = this.state[file.id];
        return (
          <div key={file.id} className={classes.inputContainer}>
            <input
              type="text"
              className={classnames(dialogClasses.bigInput)}
              value={this.state[file.id]}
              onChange={this.handleChange}
              placeholder={'EMPTY SLOT'}
              data-id={file.id}
              />
            {this.renderSave(file)}
            {this.renderCheckmark(file)}
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className={dialogClasses.container}>
        <span onClick={this.props.toggleSaveDialog} className={dialogClasses.closeButton}>X</span>
        <span className={classnames(dialogClasses.text, classes.title)}>SAVE GAME</span>
        {this.renderFiles()}
      </div>
    );
  }
}

export default SaveDialog;
