import * as React from 'react';
import * as classes from './customGameDialog.scss';
import * as dialogClasses from './dialogs.scss';
import * as classnames from 'classnames';
import customGameFields from '../../constants/customGameFields';

interface ICustomGameDialogProps {
  initMatrix: (
    propertis: { width: number; height: number; totalDemons: number }
  ) => void;
}

interface ICustomGameDialogState {
  width: number;
  height: number;
  totalDemons: number;
  isValid: boolean;
}

class CustomGameDialog extends React.PureComponent<
  ICustomGameDialogProps,
  ICustomGameDialogState
> {
  constructor(props: ICustomGameDialogProps) {
    super(props);
    this.state = {
      width: customGameFields.width.defaultValue,
      height: customGameFields.height.defaultValue,
      totalDemons: customGameFields.totalDemons.defaultValue,
      isValid: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  valuesAreValid(data: { [key: string]: number | boolean }) {
    let isValid = true;
    Object.keys(customGameFields).forEach(key => {
      if (!data[key]) {
        isValid = false;
      }
    });

    return isValid;
  }

  handleChange(event: any) {
    const domField = event.target;
    const customField = customGameFields[domField.dataset.attribute];
    let { value } = domField;
    if (value > customField.maxValue) {
      value = customField.maxValue;
    }
    const data = { ...this.state, [customField.attribute]: value };
    data.isValid = this.valuesAreValid(data);
    this.setState({
      ...data
    });
  }

  handleSubmit() {
    const { width, height, totalDemons, isValid } = this.state;
    if (!!isValid) {
      this.props.initMatrix({ width, height, totalDemons });
    }
  }

  renderFields() {
    return Object.keys(customGameFields).map(key => {
      const customField = customGameFields[key];
      return (
        <div key={customField.id} className={classes.fieldContainer}>
          <span className={classnames(dialogClasses.text, classes.label)}>
            {customField.label}
          </span>
          <input
            className={classes.input}
            type="text"
            value={this.state[customField.attribute]}
            onChange={this.handleChange}
            data-attribute={customField.attribute}
            placeholder={`MAX ${customField.maxValue}`}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={dialogClasses.container}>
        <span className={dialogClasses.text}>
          SELECT YOUR PERSONAL NIGHTMARE:
        </span>
        {this.renderFields()}
        <span
          className={classnames(dialogClasses.text, classes.startGame, {
            [classes.isValid]: this.state.isValid
          })}
          onClick={this.handleSubmit}
        >
          START GAME!
        </span>
      </div>
    );
  }
}

export default CustomGameDialog;
