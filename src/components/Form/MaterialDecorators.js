import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import styles from './MaterialStyle';

export default class MaterialDecorators extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showError: true
    };
  }

  allowErrors () {
    this.setState({showError: true});
  }

  disallowErrors () {
    this.setState({showError: false});
  }

  onBlurHandler () {
    this.disallowErrors();
  }

  onFocusHandler () {
    this.allowErrors();
  }

  componentWillReceiveProps () {
    if (this.props.formErrors.$isPristine) {
      this.allowErrors();
    }
  }

  render () {
    const {props} = this;

    const defaultProps = {
      onBlur: this.onBlurHandler.bind(this),
      onFocus: this.onFocusHandler.bind(this),
      value: props.formData[props.field.name] || '',
      disabled: props.field.disabled,
      floatingLabelText: `${props.field.label}${props.isRequired ? '*' : ''}`,
      style: styles.root,
      underlineFocusStyle: styles.underlineFocusStyle,
      underlineStyle: styles.underlineStyle,
      floatingLabelStyle: props.formErrors[props.field.name] ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.regular,
      floatingLabelFocusStyle: styles.floatingLabelFocusStyle,
      errorStyle: styles.errorStyle,
      errorText: props.formErrors[props.field.name]
    };

    return (
      <div style={styles.wrapper.regular}>
        {props.field.inputType === 'select' ? (
          <SelectField
            onChange={(e, i, value) => {props.onChangeHandler(props.field, value, props.validators);}}
            autoWidth
            menuStyle={styles.select.menuStyle}
            iconStyle={styles.select.iconStyle}
            {...defaultProps}
          >
            {_.map(props.field.options, (option, j) => {
              return (<MenuItem
                value={option.value}
                key={j} primaryText={option.name}
                      />);
            })}
          </SelectField>
        ) : (
          <TextField
            type={props.field.type}
            onChange={(e) => {props.onChangeHandler(props.field, e.target.value, props.validators);}}
            inputStyle={styles.inputStyle}
            {...defaultProps}
          />
        )}
      </div>);
  }
}
